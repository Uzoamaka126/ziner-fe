<template>
  <div class="invoice__wrap">
    <div>
      <div class="main__content">
        <div class="panel">    
            <div class="panel__content">
              <div style="margin-top: 1rem; padding-bottom: 3rem;">
                <div class="row hidden-xs">  
                  <div class="row__left">
                      <div class="row__item">
                          <div v-if="invoiceNo" class="page-title__text text--bold">INVOICE #{{ invoiceNo }}</div>
                          <div v-else class="text--bold">Create Invoice</div>
                      </div>
                  </div>
                  <!-- invoice button actions -->
                  <div class="row__right" style="padding-left: 0px; padding-right: 0px;">
                      <div class="row__item positionRelative" style="padding-left: 5px; padding-right: 5px;">
                          <button class="btn btn--secondary btn--sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Preview Invoice</button>
                      </div>
                      <div class="row__item positionRelative" style="padding-left: 5px; padding-right: 5px;">
                          <button :disabled="requestIsDisabled" @click="saveInvoice()" class="btn btn--secondary btn--sm">Save Invoice</button>
                      </div>
                      <div class="row__item positionRelative" style="padding-left: 5px; padding-right: 5px;">
                          <button :disabled="requestIsDisabled" @click="sendInvoice()" class="btn btn--primary btn--sm">Send Invoice</button>
                      </div>
                      <div class="row__item positionRelative" v-show="invoiceNo" style="padding-left: 5px; padding-right: 5px;">
                          <button :disabled="requestIsDisabled" @click="deleteInvoice()" class="btn btn--danger btn--sm">Delete Invoice</button>
                      </div>
                  </div>
                </div>

                <!-- Client info -->
                 <div class="row invoice__section--item">
                    <div class="col-12 mb--5">
                      <p class="text--bold text--color-dark">Client info</p>
                    </div>
                    <div class="col-12">
                      <div class="invoice__row invoice__item">
                        <div class="invoice__details--item mt--10">
                          <div class="flex align-items-center mt--10">
                            <div style="min-width: 400px;">
                              <div v-if="showMultipleEmailsField" @click="toggleOtherEmail = false" class="link text--xs">- Use only one email address</div>
                              <div v-else @click="toggleOtherEmail = true" class="link text--xs">+ Mail to more than one email address</div>
                            </div>
                            <outline-button :outlineType="'secondary'" :classNames="'text--xs w--fit'" :label="'+ New Client'" @click="isClientModalOpen = true" />
                            <!-- <span  class="link text--sm">+ New Client</span> -->
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <!-- <search-client-input v-model="selectedClient" :disabled="invoice.status !== 'draft'" /> -->

                <!-- other emails -->
                <div v-if="showMultipleEmailsField" class="row invoice__section--item">
                    <div class="col-12 mb--5">
                      <p class="text--bold text--color-dark">Send to other emails 
                        <span class="mb-2 text--xs" style="color: #687383; font-weight: 400;">(You can add only {{ getCCEmailsCount }} emails)</span>   
                      </p>
                    </div>
                    <div class="col-12">
                      <div class="invoice__row invoice__item">
                        <div class="invoice__details--item mt--10">
                          <input-multiple-emails
                            placeholder="enter a client's email"
                            :dropdown-fields="otherclientsSearched" 
                            @typing="searchClients"
                            @update="modifyEmails"
                            :limit="3"
                          />
                            <!-- v-model="otherClientEmails" -->
                        </div>
                      </div>
                    </div>
                </div>

                <!-- Currency -->
                <div class="row invoice__section--item">
                  <div class="col-12 mb--5">
                    <p class="text--bold text--color-dark">Currency</p>
                  </div>
                  <div class="col-12">
                    <div class="invoice__row invoice__item">
                      <div class="invoice__details--item mt--10">
                        <div class="select visible--xs width--100">
                          <select class="form-select" v-model="invoice.currency">
                            <option :key="currency" v-for="currency in currencies" :value="currency">{{ currency }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Project -->
                <div class="row invoice__section--item">
                  <div class="col-12 mb--5">
                    <p class="text--bold text--color-dark">Project</p>
                  </div>
                  <div class="col-12">
                    <div class="invoice__row invoice__item">
                      <div class="invoice__details--item mt--10">
                        <div class="select visible--xs width--100">
                          <select class="form-select" v-model="invoice.currency">
                            <option :key="currency" v-for="currency in currencies" :value="currency">{{ currency }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Add Item + computation -->
                <div class="row invoice__row block">
                    <div class="invoice__calculate--wrap">
                      <div class="form__row__left" style="max-width: unset">
                          <label for class="mb-2 invoice__compile--memo--label">Item(s)</label>
                      </div>
                      <div class="invoice__calculate--row form__row__right">
                        <div style="display: flex; width: 100%;">
                          <div class="invoice__quantity invoice__calculate--label">
                              <label class="form__label text--medium">Quantity</label>
                          </div>
                          <div class="invoice__price">
                              <label class="form__label text--medium">Price</label>
                          </div>
                          <div class="invoice__amount">
                              <label class="form__label text--medium block">Amount</label>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    <div :key="i" v-for="(item, i) in invoice.meta.items">
                      <div class="invoice__calculate--wrap positionRelative" :class="i > 0 ? 'mt--20' : ''">
                        <div class="form__row__left" style="max-width: unset">
                          <input v-model="item.item_name" type="text" class="form-control">
                          <!-- show errors per item if item isn't filled -->
                          <span class="form__errors flex align-items-center" v-show="!!firstItemIsEmpty || itemErrors[i] === 1">
                            <span class="form__errors__icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
                                <path fill="#ED6347" stroke="none" fill-rule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z" />
                              </svg>
                            </span>
                            <span class="form__errors__text ml--5" style="margin-left: 3px;">Please fill the invoice item, quantity and unit price</span>
                          </span>
                        </div>
                          
                        <div class="form__row__right invoice__calculate--row">
                            <div class="invoice__calculate--row">
                              <!-- Qty -->
                              <div class="invoice__calculate--wrap invoice__quantity" style="width: fit-content !important; flex-basis: 35%;">
                                  <money v-model="item.item_quantity" @keydown.native="preventKeys" v-bind="config.number" class="form-control" style="width: 80%" spellcheck="false"></money>
                              </div>
                              <!-- Price -->
                              <div class="invoice__price">
                                  <money v-model="item.item_price" @keydown.native="preventKeys" v-bind="moneyConfig" class="form-control" style="width: 80%" spellcheck="false"></money>                                                                    
                              </div>
                              <div class="invoice__amount">
                                  <div class="p-t-10 m-b-30 textRight text--sm">{{ invoice.currency }} {{ itemAmount(i) }}</div>
                              </div>
                            </div>
                        </div>
                         <!-- 
                           The close button not displayed for the first invoice item
                           The first invoice item can't be removed because at least one item has to be on the invoice list
                          -->
                        <div class="invoice__form__close-item" @click="removeInvoiceItem(i)" v-show="i > 0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="12" fill="#B9B9B9"/>
                              <path d="M11.0492 12.0001L6.92 7.87094C6.66346 7.61462 6.66346 7.19873 6.92 6.94241C7.17654 6.68586 7.59199 6.68586 7.84853 6.94241L11.9777 11.0716L16.1071 6.94241C16.3636 6.68586 16.7791 6.68586 17.0356 6.94241C17.2922 7.19873 17.2922 7.61462 17.0356 7.87094L12.9062 12.0001L17.0356 16.1293C17.2922 16.3856 17.2922 16.8015 17.0356 17.0578C16.9074 17.1859 16.7392 17.25 16.5714 17.25C16.4035 17.25 16.2354 17.1859 16.1071 17.0576L11.9777 12.9284L7.84853 17.0576C7.72026 17.1859 7.55215 17.25 7.38426 17.25C7.21637 17.25 7.04827 17.1859 6.92 17.0576C6.66346 16.8013 6.66346 16.3854 6.92 16.1291L11.0492 12.0001Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                </div>

                <!-- Subtotal -->
                <div class="row invoice__section--item">
                  <div class="col-12 mb--5">
                    <p class="text--bold text--color-dark">Others</p>
                  </div>
                  <div class="col-12">
                    <div class="invoice__row invoice__item">
                      <div class="invoice__details--item mt--10 flex-column" >
                        <div class="invoice__compile--row">
                          <div class="invoice__compile--label">Subtotal</div>
                          <div class="invoice__compile--value ml--10">NGN 0.00</div>
                        </div>
                        <div>
                          <div class="invoice__compile--row">
                            <div class="dropdown">
                              <div class="invoice__compile--btn cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Add Tax</div>
                              <ul class="dropdown-menu invoice__tax--item" aria-labelledby="dropdownMenuButton1">
                                <li style="margin-top: 14px">
                                  <div class="dropdown-item invoice__tax--item">
                                    <select class="form-select form-select-sm invoice__compile--select" aria-label="Default select example">
                                      <option selected>Tax Type</option>
                                      <option value="percentage">Percentage</option>
                                      <option value="flat">Flat</option>
                                    </select>
                                  </div>
                                  </li>
                                <li>
                                  <div class="dropdown-item invoice__tax--item" style="margin-top: 10px">
                                    <input value="money" class="form-control" />
                                  </div>
                                </li>
                                <li>
                                  <div class="invoice__tax--item last dropdown-item">
                                    <button type="button" class="btn btn--secondary btn--sm text--xs">Cancel</button>
                                    <button type="button" class="btn btn--primary btn--sm text--xs">Add</button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div class="invoice__compile--value">NGN 0.00</div>
                          </div>
                        </div>
                        <div class="invoice__compile--row invoice__row__total">
                          <div class="invoice-computation__label bold">Total</div>
                          <div class="invoice-computation__action"></div>
                          <div class="invoice-computation__item bold">{{ invoice.currency }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!--  Memo -->
                <div class="row invoice__section--item">
                  <div class="col-12 mb--5">
                    <p class="text--bold text--color-dark">Memo</p>
                  </div>
                
                  <div class="col-12">
                    <div class="invoice__row invoice__item">
                      <div class="invoice__details--item mt--10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                 <!-- Due date -->
                <div class="row invoice__section--item">
                  <div class="col-12 mb--5">
                    <p class="text--bold text--color-dark">Reminder
                      <span class="mb-2 text--xs" style="color: #687383; font-weight: 400;">(Due date)</span>                    
                    </p>
                  </div>
                
                  <div class="col-12">
                    <div class="invoice__row invoice__item">
                      <div class="invoice__details--item mt--10">
                        <div class="">
                          <v-date-picker v-model="invoice.due_date">
                            <template #default="{ inputValue, inputEvents }">
                                <input class="px-3 py-1 border rounded due_date form-control" :value="inputValue" v-on="inputEvents" />
                            </template>
                          </v-date-picker>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

      <!-- add new client modal -->
      <create-client-modal :loading="isNewClientCreateLoading" :showModal="isClientModalOpen" @cancel="isClientModalOpen = false" />

    <!-- preview invoice off-canvas -->
    <preview-invoice :items="invoice.meta.items" />
  </div>
</template>

<script>
// import { userCountry, paymentLinkSupportedCountries } from "../../../functions/countries"
// import toast from "@/functions/toast";
// TO DO
import SearchClientInput from "./helperComponents/SearchClientInput.vue";
import PreviewInvoice from "./helperComponents/PreviewInvoice.vue";
import InputMultipleEmails from '../shared/input/InputMultipleEmails'
import CreateClientModal from '../shared/modals/CreateClient.vue'
import OutlineButton from '../shared/buttons/OutlineButton'
// import { createQueryString } from '../../../functions/request';
// import { debounce, arrayToObject } from "../../../functions/utils";
// import InputNumber from "@/ui/input-number.vue";
// import InputMoney from "@/ui/input-money.vue";

export default {
  components: {
    SearchClientInput,
    InputMultipleEmails,
    PreviewInvoice,
    CreateClientModal,
    OutlineButton
  },

  created() {
  },

  props: ['user'],
  
  data() {
    return {
      type: {
        newInvoice: false,
        existingInvoice: false,
      },
      invoiceNo: undefined,
      invoice: {
        amount: 0,
        currency: 'NGN',
        client: undefined,
        clientEmail: "",
        date_created: new Date(),
        date_paid: new Date(),
        description: "",
        due_date: new Date(),
        id: 0,
        meta: {
          ccEmails: [],
          tax: [{ tax_description: null, tax_name: "vat", tax_type: "flat", tax_value: 0 }],
          invoice_interval: [{ interval_description: null, interval_name: "invoice_interval", interval_type: "One Time", interval_value: "One Time" }],
          invoice_notes: [{ notes_description: null, notes_name: "invoice_notes", notes_type: "invoice_notes_1", notes_value: "" }],
          reminders: [],
          items: [{ item_name: "", item_price: 0.00, item_quantity: 0, item_unit: 0.00 }],
        },
        status: "draft",
        title: "INVOICE_FROM_DASHBOARD"
      },
      client: {
        isEmpty: false,
      },
      itemErrors: [],
      newClient: {
        name: "",
        email: "",
        phoneNumber: "",
        country: "",
        address: "",
        clickedCreateBtn: false,
      },
      countries: [],
      otherclientsSearched: [],
      currencies: ['NGN', 'USD', 'EUR', 'GHS', 'GBP'],
      config: {
        dueDate: {
          date: undefined,
          isEmpty: false,
          lang: {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
            placeholder: {
              date: 'Select Date',
              dateRange: 'Select Date Range'
            }
          },
        },
        number: {
          decimal: '.',
          thousands: ',',          // The currency name or symbol followed by a space.
          prefix: "",
          suffix: '',
          precision: 0,
          masked: false
        },
        percentage: {
          decimal: '.',
          thousands: ',',          // The currency name or symbol followed by a space.
          prefix: "%",
          suffix: '',
          precision: 2,
          masked: false
        },
      },
      toggleOtherEmail: false,
      requestIsDisabled: false,
      invoiceTaxType: {
        /**
         * @type{"percentage" | "flat"}
         */
        type: "percentage",
        value: 0
      },
      remindersNames: [],
      reminderIsSet: false,
      isShowAddTax: false,
      isInvoiceEmpty: false,
      // have a state to keep track of whether the invoice being sent to the backend is valid
      isNewInvoiceDataValid: false,
      isClientEmailsEmpty: false  ,
      firstItemIsEmpty: false,
      isClientModalOpen: false,
      isNewClientCreateLoading: false 
    }
  },

  beforeRouteEnter( to, from, next ) {
    next( vm => {
      if(to.name === "edit-invoice-view") { 
        vm.invoiceNo = vm.$route.params.id;
        vm.fetchInvoice();
        vm.type.existingInvoice = true;
      }
      else vm.type.newInvoice = true;

      next();
    })
  },

  computed: {
    showMultipleEmailsField() {
      return this.toggleOtherEmail ? true : false
    },
    
    moneyConfig() {
      return {
          decimal: '.',
          thousands: ',',
          prefix: this.invoice.currency + " ",
          suffix: '',
          precision: 2,
          masked: false,
      }
    },

    selectedClient: {
      get() {
        return {
          email: this.invoice.clientEmail,
          client: this.invoice.client,
        }
      },

      set( newVal ) {
        this.invoice.email = newVal.clientEmail;
        this.invoice.client = newVal.client;
      }
    },

    // otherClientEmails: {
    //   /**  
    //    * @returns { [] }
    //   */
    //   get() {
    //     const ccEmails = this.invoice.meta && this.invoice.meta.ccEmails; // if the user is editing
    //     if(!ccEmails || ccEmails.length <= 0 ) return [];
    //     else return ccEmails.split( "," );
    //   },
    //   set(arr = []) {
    //     console.log({ arr });
    //     this.invoice.meta.ccEmails = arr.join( "," )
    //   }
    // },

    sendViaWhatsapp: {
      get: function() {
        return this.invoice.meta.send_via_whatsapp === 1 ? true : false;
      },
      set: function( val ) {
        this.invoice.meta.send_via_whatsapp = val ? 1 : 0
      }
    },

    invoiceInterval: {
      get: function() {
        return this.invoice.meta.invoice_interval[ 0 ].interval_type;
      },

      set: function( val ) {
        this.invoice.meta.invoice_interval[ 0 ].interval_type = val;
        this.invoice.meta.invoice_interval[ 0 ].interval_value = val;
      }      
    },

    invoiceNotes: {
      get: function() {
        return this.invoice.meta.invoice_notes[ 0 ].notes_value;
      },

      set: function( val ) {
        this.invoice.meta.invoice_notes[ 0 ].notes_value = val;
      }
    },

    invoiceSubTotal() {
      const items = this.invoice.meta.items;
      return this.sumElements( items, "item_price" )
    },

    invoiceTax: {
      get: function() {
        return parseFloat( this.invoice.meta.tax[ 0 ].tax_value );
      },

      set: function( val ) {
        if( this.invoiceTaxType.type === "percentage" ) {
          this.invoice.meta.tax[ 0 ].tax_type = "percentage";
        }
        this.invoice.meta.tax[ 0 ].tax_value = parseFloat( val );
      }
    },

    invoiceTotal() {
      return (
        ( parseFloat(this.invoiceSubTotal) + 
          parseFloat(this.invoiceShippingFee) + 
          parseFloat(this.invoiceTax) 
        ) - parseFloat(this.invoiceDiscount)
      )
    },

    checkIfNewClientValuesAreValid() {
      if (this.newClient.name.length < 1) {
        return true
      } else if(this.newClient.email.length < 5) {
        return true
      } else if (this.newClient.phoneNumber.length < 10) {
        return true
      } else if (this.newClient.address.length < 5) {
        return true
      } else if(this.newClient.country.length < 1) {
        return true
      } else {
        return false
      }
    },

    checkIfCurrentClientEmails() {
     if(!this.invoice.meta.cc || this.invoice.clientEmail.trim() === "") {
        return true
     }
    },
    getCCEmailsCount() {
      return 3 - (this.invoice.meta.ccEmails.length)
    }
  },

  methods: {
    modifyEmails (arr = []) {
      console.log({ arr }, 'hit here');
      this.invoice.meta.ccEmails = arr
    },
    itemAmount( i ) {
      const item = this.invoice.meta.items[ i ]
      const quantity = item.item_quantity;
      const unit = item.item_price;
      const price = parseFloat(quantity) * parseFloat(unit);
      this.invoice.meta.items[i].item_unit = price;
      return typeof price === 'number' ? price.toFixed(3) : 0;
    },

    addAnotherInvoiceItem() {
      const isEmptyCheck = this.checkIfInvoiceItemIsEmpty();

      console.log('isEmptyCheck:', isEmptyCheck);
      if (isEmptyCheck === true || !this.firstItemIsEmpty) {
        return;
      } else {
        this.firstItemIsEmpty = false;
        // this.itemErrors = [];
        this.invoice.meta.items = [...this.invoice.meta.items, {
          item_name: "",
          item_price: 0,
          item_quantity: 1,
          item_unit: 0,
        }]
      }
    },

    checkIfInvoiceItemIsEmpty() {
      let isAnItemEmpty = false;

      const items = this.invoice.meta.items;
      if (items[0].item_name === '' || items[0].item_unit === 0) {
        this.firstItemIsEmpty = true;
        isAnItemEmpty = true
      } else {
        this.firstItemIsEmpty = false;
        items.map((item, i) => {
          const emptyItemFields = (
            item.item_name === "" ||
            parseFloat(item.item_price) <= 0 ||
            item.item_quantity < 1 ||
            item.item_unit <= 0
          );
          if(emptyItemFields) {
            isAnItemEmpty = true
            this.itemErrors.push(i);
          } else {
            isAnItemEmpty = false;
            // this.firstItemIsEmpty = true;
          }
        })
      }
      return isAnItemEmpty
    },

    removeInvoiceItem( index = this.invoice.meta.items.length - 1 ) {
      /**
       * This will remove an invoice item from the list of items based on the index.
       * if none is defined, it removes the last item.
       */
      this.$delete( this.invoice.meta.items, index );
    },

    fetchCountries () {
      this.$http.get('i/v1/extras/countries?view_group=2').then( res => {
        this.countries = res.body.data
      })
      .catch(err => {
        console.error(err)
      })
    },

    createNewClient() {
      this.isNewClientCreateLoading = true

      const clientPayload = {
        client_name: this.newClient.name,
        email: this.newClient.email,
        phoneNumber: this.newClient.phone,
        country: this.newClient.country,
        address: this.newClient.address,
        // user_id: user.id
      }
      // make api call here
      // this.$http.post( "v2/clients/create", clientData ).then(({ ok, data }) => {
      //   if( ok !== true ) return console.error( "Couldn't create new client" );
      //   const client = data.data;

        // this.invoice.clientEmail = client.clientEmail;
        // this.invoice.client = client;

        this.invoice.clientEmail = this.newClient.email;
        this.invoice.client = this.newClient;
        this.client.isEmpty = false;
        // this.resetCreateClientData();
        this.isClientModalOpen = false

      //   toast.green( "Successfully added new client" )
      //   // close modal
      //   $('#invoice__add-new-client-modal').modal('hide');
      // })
      // .catch( error => {
      //   toast.red( error.data.message );
      //   console.log( error.data.message );
      // })
    },

    validateInvoiceItems() {
      let isValid = true;
      const $this = this;

      // validate client email
      if(!this.invoice.clientEmail || this.invoice.clientEmail.trim() === "") {
        this.client.isEmpty = true;
        isValid = false;
      } else {
        this.client.isEmpty = false;
      }

      // validate due date
      if(!this.invoice.due_date) {
        this.config.dueDate.isEmpty = true;
        isValid = false;
      } else {
        this.config.dueDate.isEmpty = false;
      }

      const checkIfItemsAreEmpty = this.checkIfInvoiceItemIsEmpty();
      if(!checkIfItemsAreEmpty) {
        this.isValid = false;
      }

      if( this.invoiceTotal <= 0 ) return false;
      return isValid;

    },

    createInvoicePayload() {
      return {
        amount: this.invoiceTotal,
        currency: this.invoice.currency,
        title: "Invoice from " + window.localStorage.companyName,
        description: this.invoice.meta.invoice_notes[ 0 ].notes_value,
        // due_date: moment( this.invoice.due_date ).format( "YYYY-MM-DD" ),
        clientEmail: this.invoice.clientEmail,
        client: {
          id: this.invoice.client ? this.invoice.client.id : undefined,
          fullname: this.invoice.client ? this.invoice.client.client_fullname : undefined,
          phoneNumber: this.invoice.client ? this.invoice.client.phoneNumber : undefined,
          email: this.invoice.client ? this.invoice.client.clientEmail : this.invoice.clientEmail,
          meta: this.invoice.client ? this.invoice.client.meta : undefined,
        }, 
        meta: this.invoice.meta
      };
    },

    saveExistingInvoice( payload ) {
      return this.$http.post(`v2/invoices/${ this.invoice.id }/edit`, payload )
    },

    saveNewInvoice( payload ) {
      return this.$http.post(`v2/invoices`, payload ).then( resp => {
        // Track invoice creation on mixpanel
        mixpanel.track("Invoice Created", {
          "$email": window.localStorage.userEmail
        });
        return resp;
      });
    },

    sendCreatedInvoice( invoice ) {
      return this.$http.post( `v2/invoices/${ invoice.id  }/send` ).then(({ ok, data }) => {
        if( ok === false || data.status !== "success" ) {
          return console.error("Couldn't Save Invoices for client.");
        }
        toast.green( "Invoice has been sent successfully" );
        mixpanel.track( "Invoice Sent", {
          "$email": window.localStorage.userEmail
        })
        this.$router.push({ name: "invoices-list" });
      })
      .catch( error => {
        toast.red( error.data.message );
        console.log( error.data.message );
      });
    },

    saveInvoice() {
      const payload = this.createInvoicePayload();
      const isValid = this.validateInvoiceItems();
      
      if( isValid === false ) return undefined;
      this.requestIsDisabled = true;
      if( this.type.newInvoice ) {
        return this.saveNewInvoice( payload ).then(({ ok, data }) => {

          if( ok === false || data.status === "error" ) return console.log( "Couldn't create invoice" );

          toast.green( "Invoice has been saved successfully" );

          this.requestIsDisabled = false;
          this.$router.push({ name: "invoices-list" });

        })
        .catch( error => {
          toast.red( error.data.message );
          this.requestIsDisabled = false;
          console.log( error.data.message );
        });
      }
      else {    
        return this.saveExistingInvoice( payload ).then(({ ok, data }) => {
          if( ok === false || data.status === "error" ) return console.log( "Couldn't create invoice" );

          // Show success toast.
          toast.green( "Invoice has been modified successfully" );
          this.$router.push({ name: "invoices-list" })
        })
        .catch( error => {
          // Show error toast.
          toast.red( error.data.message );
          console.log( "<<<", payload );
          console.log( error.data.message );
        });
      };
    },

    sendInvoice() {
      const payload = this.createInvoicePayload();
      const isValid = this.validateInvoiceItems();
      if( isValid === false ) return undefined;

      this.requestIsDisabled = true;

      if( this.type.newInvoice ) {
        this.saveNewInvoice( payload )
        .then(({ ok, data }) => this.sendCreatedInvoice( data.data ) ).then( () => {
          this.requestIsDisabled = false;
        })
        .catch(error => {
          toast.red( error.data.message );
          this.requestIsDisabled = false;
        });
      } else {
        return this.saveExistingInvoice( payload )
        .then(({ ok, data }) => this.sendCreatedInvoice( data.data )).then(() => {
          this.requestIsDisabled = false;
        })
        .catch(error => {
          toast.red( error.data.message );
          this.requestIsDisabled = false;
        });
      }
    },

    deleteInvoice() {
      this.requestIsDisabled = true;
      this.$http.post( `v2/invoices/${ this.invoice.id }/delete` )
      .then(({ ok, data }) => {
        if( ok === false || data.status !== "success" ) return console.error("Couldn't Delete Invoices for client.");
        this.requestIsDisabled = false;
        toast.green( "Invoice has been removed successfully." );
        this.$router.push({ name: "invoices-list" });
      })
      
      .catch( error => {
        this.requestIsDisabled = false;
        toast.red( error.data.message );
        console.log( error.data.message );
      });
    },

    fetchInvoice() { // for draft invoices
      const queryString = `v2/invoices/${ this.invoiceNo }/?include_client=1`;
      this.$http.get(queryString).then(({ ok, data }) => {
        if (ok !== true) return;
        this.invoice = data.data;
        if( this.invoice.status === 'paid' ) return this.$router.push({ name: "not-found" });
        this.loading = false;
      })
      .catch( error => {
        console.log( error.data.message );
        this.$router.push({ name: "not-found" })
      })
    },

    searchclients( query ) {
      // debounce(() => {
      //   query = query.trim();
      //   if( query.length < 1 ) return;
      //   const url = transformQueryToString( "v2/clients/query", { q: query });
      //   this.$http.get( url ).then(({ ok, data }) => {
      //     const clients = data.data.clients;
      //     this.otherclientsSearched = arrayToObject( clients, "clientEmail", "client_fullname" );
      //   });
      // })
    },

    /**
     * Returns the sum of all the elements 
     * fields in an array of elements
     */
    sumElements( elems, field ) {
      if( elems.length === 0 ) return 0;
      let sum = parseFloat( elems[ 0 ][ field ] );
      if( elems.length === 1 ) return sum;
      else {
        for( let i = 1; i < elems.length; i++ ) {
          sum += parseFloat( elems[ i ][ field ] )
        }
        return sum;
      }
    },

    preventKeys (event) {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 37 || event.keyCode == 39) {
      } else {
        return event.preventDefault();
      }
    },

    setReminders() {
      this.invoice.meta.reminders = [];
      for(let i = 0; i < this.remindersNames.length; i++) {
        this.invoice.meta.reminders.push({
          reminder_name: this.remindersNames[i],
          // reminder_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          reminder_note: this.getReminderNote( this.remindersNames[i] ),
        })
      }
      
      if (this.remindersNames.length > 0) this.reminderIsSet = true;
      else this.reminderIsSet = false;    
    },

    getReminderNote( reminderName ) {
      switch( true ) {
        case reminderName === "onduedate": return "Remind on Due Date";
        case reminderName.endsWith( "before"): return "Remind Before Due Date";
        case reminderName.endsWith( "after" ): return "Remind After Due Date";
        default: return "N/A"
      }
    },

    showAddTaxView() {
      this.isShowAddTax = !this.isShowAddTax
    },

    resetCreateClientData() {
      this.newClient.name = "";
      this.newClient.email = "";
      this.newClient.phoneNumber = "";
      this.newClient.country = "";
      this.newClient.address = '';
      this.newClient.clickedCreateBtn = false;
    }
  },

  watch: {
    invoiceSubTotal( newVal ) {
      if( newVal <= 0 ) return;

      const taxIsPercentage = this.invoice.meta.tax[ 0 ].tax_type === "percentage";
      const tax = parseFloat( this.invoice.meta.tax[ 0 ].tax_value );

      if( taxIsPercentage && tax > 0 ) {
        this.invoiceTaxType.value = ( tax / this.invoiceSubTotal ) * 100;
      }

      this.invoiceTax = parseFloat( ( this.invoiceTaxType.value / 100 ) * this.invoiceSubTotal ).toFixed(2);
    },

    ["invoiceTaxType.value"]( newVal ) {
      if( this.invoiceSubTotal <= 0 ) return;
      this.invoiceTax = parseFloat( (newVal / 100 ) * this.invoiceSubTotal ).toFixed(2);
    },
  }
}
</script>

<style lang="scss" scoped>
.invoice__form__close-item {
  position: absolute;
  top: 5px;
  right: -40px;
  z-index: 9000;
}
.form-select {
  font-size: 0.875rem;
}
.invoice__details--item {
  max-width: 500px;
}
</style>