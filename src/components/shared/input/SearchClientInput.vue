<template>
  <div class="input-search-select" @dblclick="">
    <div class="input-wrap">
        <input 
            :disabled="disabled" 
            v-model="getClientEmail" 
            @click="showDropdown" 
            @keyup="waitTillTypingIsDone" 
            @change="$emit('update:selection', $event.target.value)"
            type="email" 
            :placeholder="placeholder" 
            class="form-control form-control-sm"
        />  
    </div>
    <div class="input__dropdown" v-show="dropDownIsShown">
      <div class="input__dropdown__items">
        <div class="flex justify-content-center  mt--10 mb--10">
            <outline-button 
                :outlineType="'secondary'" 
                :classNames="'text--xs w--fit'" 
                :label="btnLabel" 
                :isDisabled="loading"
                @click="addNewItem" 
            />
        </div>
        <div v-if="loading">
            <div style="display: flex; justify-content: center; padding-top: 1rem; padding-bottom: 1rem">
                <div class="spinner-border text-primary" role="status" style="color: #596dde !important;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else-if="!loading && list.length > 0" class="search__wrap">
            <p class="text--color-dark text--upper text--bold text--xs mb--10 mt--20">All {{ listType }}s</p>
            <div class="search__list">
                <div @click="selectItem(item)" :key="item.id" v-for="item in list" class="input__dropdown__item text--xs">
                    <span v-if="listType === 'client'" class="text--medium text--color item--title">{{ item.name }} </span> - <span style="color: #697386">{{ item.email }}</span>
                    <span v-if="listType === 'project'" class="item--subtitle">{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="no__clients mb--10">
                <p class="text--xs">No {{ listType }}s found</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transformQueryToString } from '../../../utils/others';
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
                if (this.listType === 'client') {
                    value = value.trim();
                    // If no email was entered, set the customer to undefined.
                    if (value.length === 0 ) {
                        this.reactiveSelection.email = "";
                        this.reactiveSelection.client = undefined;
                        this.$emit("change", this.reactiveSelection);
                        return;
                    }
    
                    // Update the reactive customer based on the email.
                    const getClient = this.list.find(client => client.email === value);
                    
                    // If the email is not found while searching, let the user add that email as a new email
                    if (!getClient) {
                        this.reactiveSelection.email = "";
                        this.reactiveSelection.customer = undefined;
                        // this.$emit("change", this.reactiveSelection);
                        return
                    } else {
                        this.reactiveSelection.email = getClient.email;
                        this.reactiveSelection.client = getClient;
                        this.$emit("change", this.reactiveSelection );
                    }
                }
                
                if (this.listType === 'project') {
                    email = value.trim();
                    // If no email was entered, set the customer to undefined.
                    if (!value.length) {
                        this.reactiveSelection.title = "";
                        this.reactiveSelection.project = undefined;
                        // this.$emit("change", this.reactiveSelection);
                        return;
                    }
    
                    // Update the reactive customer based on the email.
                    const getProject = this.list.find(item => item.title === value);
                    
                    if (!getProject) {
                        this.reactiveSelection.title = undefined;
                        this.reactiveSelection.project = undefined;
                        return;
                        // this.$emit("change", this.reactiveSelection);
                    } else {
                        this.reactiveSelection.title = getProject.title;
                        this.reactiveSelection.project = getProject;
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
    },

    methods: {
        selectItem(item) {
            if (this.listType === 'client') {
                this.reactiveSelection.client = item;
                this.reactiveSelection.email = item.email;
                this.$emit("change", this.reactiveSelection)
                this.$emit("setItem", this.reactiveSelection?.client)
            } else if (this.listType === 'project') {
                this.reactiveSelection.project = item;
                this.reactiveSelection.title = item.title;
                this.$emit("change", this.reactiveSelection)
                this.$emit("setItem", this.reactiveSelection?.project)
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
            this.$emit('none')
            this.dropDownIsShown = false;
        },

        showDropdown() {
            this.$emit('setType')
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

    .search  {
        &__wrap {
            padding-left: 15px;
            padding-right: 5px;
        }
        &__list{
            height: 200px;
            scroll-behavior: smooth;
            overflow-y: scroll;
        }
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
    padding: 7px 0px;
    cursor: pointer;
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
    .item {
        &--title {
            color: #1a1f36;
        }
        &--subtitle {
            color: #697386;
        }
    }
</style>
