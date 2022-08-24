<template>
  <div class="input-search-select" v-click-outside="hideDropdown">
    <div class="input-wrap">
        <input 
            :disabled="disabled" 
            v-model="getClientEmail" 
            @click="showDropdown" 
            @keyup="waitTillTypingIsDone" 
            type="email" 
            placeholder="Enter Email Address" 
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
        <div v-else-if="!loading && clients.length > 0">
            <div @click="selectClient(client)" :key="client.id" v-for="client in clients" class="input__dropdown__item">
                <span style="color: #1a1f36">{{ client.name }} </span> - <span style="color: #697386">{{ client.email }}</span>
            </div>
        </div>
        <div v-else>
            <div class="no__clients">
                <p>No client found</p>
                <p @click="hideDropdown()">Hide dropdown</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transformQueryToString } from '../../../utils/apiFunctions';

/**
 * This component adds a new client or shows a list of existing clients
 */
export default {
    name: 'SearchClientInput',
    props: {
        /**
         * @type{{
         *  customer_email :string | undefined;
         *  customer: { customer_email :string, customer_fullname :string, date_created :string, is_blacklisted :boolean, customer_phonenumber :string, id :string } | undefined 
         * }}
        */
        disabled: { type: Boolean, default: false },
        selection: { type: Object, default: undefined },
    },

    model: {
        prop: "selection",
        event: "change"
    },

    data() {
        return {
            clients: [],
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
                else return this.reactiveSelection.email;
            },

            set (email) {
                // remove whitespaces.
                email = email.trim();
                // If no email was entered, set the customer to undefined.
                if (email.length === 0 ) {
                    this.reactiveSelection.email = "";
                    this.reactiveSelection.client = undefined;
                    this.$emit( "change", this.reactiveSelection );
                    return;
                }

                // Update the reactive customer based on the email.
                const getClient = this.clients.find(client => client.email === email );
                
                // If the email is not found while searching, let the user add that email as a new email
                if (getClient === undefined ) {
                    this.reactiveSelection.email = email;
                    this.reactiveSelection.customer = undefined;
                    this.$emit( "change", this.reactiveSelection );
                }

                else {
                    this.reactiveSelection.email = getClient.email;
                    this.reactiveSelection.customer = getClient;
                    this.$emit("change", this.reactiveSelection );
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
        selectClient(client) {
        this.reactiveSelection.client = client;
        this.reactiveSelection.email = client.email;
        this.$emit( "change", this.reactiveSelection )
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

        fetchClients() {
            // this.$http.get("/clients").then(({ ok, data }) => {
            //     if( ok !== true ) return console.error( "Unable to fetch clients" );
            //     this.clients = data.data.clients;
            //     this.loading = false;
            // });
        },

        hideDropdown() {
            this.dropDownIsShown = false;
        },

        showDropdown() {
            this.dropDownIsShown = true;
        }
    },

    created() {
        this.fetchClients();
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
