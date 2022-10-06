<template>
  <div class="input-search-select" @dblclick="">
    <div class="input-wrap">
        <input 
            :disabled="disabled" 
            v-model="getClientEmail" 
            @click="showDropdown" 
            @keyup="waitTillTypingIsDone" 
            type="email" 
            :placeholder="placeholder" 
            class="form-control form-control-sm"
        >  
    </div>
    <div class="input__dropdown" v-show="dropDownIsShown">
      <div class="input__dropdown__items">
        <div v-if="loading">
            <div style="display: flex; justify-content: center; padding-top: 1rem; padding-bottom: 1rem">
                <div class="spinner-border text-primary" role="status" style="color: #596dde !important;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>  
        <div v-else-if="!loading && list.length > 0">
            <p class="text--color-dark text--capitalize">All {{ listType }}s</p>
            <div @click="selectItem(item)" :key="item.id" v-for="item in list" class="input__dropdown__item">
                <span v-if="listType === 'client'" style="color: #1a1f36">{{ item.name }} </span> - <span style="color: #697386">{{ item.email }}</span>
                <span v-if="listType === 'project'" style="color: #697386">{{ item.title }}</span>
            </div>
        </div>
        <div v-else>
            <div class="no__clients">
                <p>No {{ listType }}s found</p>
                <outline-button :outlineType="'secondary'" :classNames="'text--xs w--fit mt--10 mb--10'" :label="btnLabel" @click="addNewItem" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transformQueryToString } from '../../../utils/apiFunctions';
import OutlineButton from '../buttons/OutlineButton'


/**
 * This component adds a new client/project or shows a list of existing clients/projects
 */
export default {
    name: 'SearchListInput',
    props: {
        disabled: { type: Boolean, default: false },
        selection: { type: Object, default: undefined },
        list: { type: Array, default: []},
        listType: { type: String, default: 'client'},
        placeholder: { type: String, default: ''},
        btnLabel: { type: String, default: ''},
    },
    components: {
        OutlineButton
    },

    model: {
        prop: "selection",
        event: "change"
    },

    data() {
        return {
            items: [],
            reactiveSelection: this.selection,
            dropDownIsShown: false,
            loading: false,
            typingInput: null,
        }
    },

    computed: {
        getClientEmail: {
            get () {
                if (this.reactiveSelection === undefined ) return "";
                
                switch (this.listType) {
                    case 'client':
                        return this.reactiveSelection.email;

                    case 'project':
                        return this.reactiveSelection.title;

                    default: 
                        return this.reactiveSelection.email;
                }
            },

            set (value) {
                // remove whitespaces.
                if (this.listType === 'client') {
                    email = value.trim();
                    // If no email was entered, set the customer to undefined.
                    if (value.length === 0 ) {
                        this.reactiveSelection.email = "";
                        this.reactiveSelection.client = undefined;
                        this.$emit("change", this.reactiveSelection);
                        return;
                    }
    
                    // Update the reactive customer based on the email.
                    const getClient = this.clients.find(client => client.email === value);
                    
                    // If the email is not found while searching, let the user add that email as a new email
                    if (getClient === undefined ) {
                        this.reactiveSelection.email = value;
                        this.reactiveSelection.customer = undefined;
                        this.$emit("change", this.reactiveSelection);
                    }
    
                    else {
                        this.reactiveSelection.email = getClient.email;
                        this.reactiveSelection.customer = getClient;
                        this.$emit("change", this.reactiveSelection );
                    }
                } else if (this.listType === 'client') {
                    email = value.trim();
                    // If no email was entered, set the customer to undefined.
                    if (value.length === 0 ) {
                        this.reactiveSelection.email = "";
                        this.reactiveSelection.client = undefined;
                        this.$emit("change", this.reactiveSelection);
                        return;
                    }
    
                    // Update the reactive customer based on the email.
                    const getClient = this.clients.find(client => client.email === value);
                    
                    // If the email is not found while searching, let the user add that email as a new email
                    if (getClient === undefined ) {
                        this.reactiveSelection.email = value;
                        this.reactiveSelection.customer = undefined;
                        this.$emit("change", this.reactiveSelection);
                    }
    
                    else {
                        this.reactiveSelection.email = getClient.email;
                        this.reactiveSelection.customer = getClient;
                        this.$emit("change", this.reactiveSelection );
                    }
                }
            },
        },
    },

    watch: {
        selection(newVal) {
            this.reactiveSelection = newVal;
        },
        reactiveSelection( newVal ) {
            this.$emit( "change", newVal )
            this.$emit('input', newVal)
        }
    },

    methods: {
        selectItem(item) {
            if (this.listType === 'client') {
                this.reactiveSelection.client = client;
                this.reactiveSelection.email = item.email;
                this.$emit("change", this.reactiveSelection)
            }
            if (this.listType === 'project') {
                this.reactiveSelection.project = project;
                this.reactiveSelection.title = item.title;
                this.$emit("change", this.reactiveSelection)
            }
            this.hideDropdown();
        },
        /**
         * This is so you're not sending multiple requests to the server.
         */
        waitTillTypingIsDone() {
            clearTimeout( this.typingInput );
            /**
             * Only make a search request after 800 milliseconds.
             */
            this.typingInput = setTimeout( this.searchClients, 500 )
        },

        searchClients(query) {
            debounce(() => {
                query = query.trim();
                if(query.length < 1) return;

                const url = transformQueryToString("url", { q: query });
                this.loading = true;
                // this.$http.get( url ).then(({ ok, data }) => {
                //     this.clients = data.data.clients;
                //     this.loading = false;
                //     this
                // });
            })
        },

        hideDropdown() {
            this.dropDownIsShown = false;
        },

        showDropdown() {
            this.dropDownIsShown = true;
        },
        addNewItem() {
            // switch(itemType) {
            //     case 'client':

            // }
            this.$emit('addItem')
            this.hideDropdown()
        }
    },
}
</script>

<style lang="scss" scoped>
    .input-search-select {
        position: relative;
    }

  .input__dropdown {
    width: 100%;
    margin-top: 5px;
    background-color: #ffffff;
    position: absolute;
    z-index: 1;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    border: solid 1px #c4cdd5;
  }

  .input__dropdown__items {
    padding: 10px 0;
  }

  .input__dropdown__item {
    padding: 5px 10px;
    cursor: pointer;
  }
  .add__client--email {
       padding: 5px;
        
        &.no_client {
            background-color: #596dde;
            color: #f2f2f2;
        }
        &.client {
            background-color: transparent;
            color: #1a1f36;
        }
    }
    .no__clients {
        display: flex;
        justify-content: center;
        font-size: 14px;
        flex-direction: column;
        align-items: center;

        p {
            &:nth-child(2) {
                color: tan;
                cursor: pointer;
                font-weight: 500;
            }
        }
    }
</style>
