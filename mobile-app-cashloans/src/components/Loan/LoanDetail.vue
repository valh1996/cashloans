<template id="loan-detail-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left back">
        <v-ons-toolbar-button @click="back">
          <v-ons-icon icon="fa-chevron-left" class="list-item__icon"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center title">Détail du prêt</div>
      <div class="right">
        <v-ons-toolbar-button @click="markAsReimbursed" :disabled="loan.returned == 1">
          <v-ons-icon icon="fa-check-circle" class="list-item__icon"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <ons-row id="edit-form">
      <ons-col width="100%">
        <h3 v-if="loan.returned == 0">{{ loan.borrower_name }} vous doit {{ loan.amount | twoDecimal }} CHF</h3>
        <h3 v-if="loan.returned_date">Cet prêt a été remboursé le {{ loan.returned_date | moment("DD.MM.YYYY") }}</h3>
      </ons-col>
      <ons-col width="100%">
        <p>
          <label for="amount">Montant</label><br>
          <v-ons-input type="number" step=".01" id="amount" modifier="underbar" v-bind:value="loan.amount" v-model="loan.amount" :disabled="loan.returned == 1" float></v-ons-input>
        </p>
        <p>
          <label for="amount">Note personnelle</label><br>
          <textarea class="textarea" rows="3" v-bind:value="loan.note" :disabled="loan.returned == 1"></textarea>
        </p>
        <p>
          <label for="loan_date">Date du prêt</label><br>
          <input type="date" id="loan_date"
            v-bind:value="loan.loan_date" :disabled="loan.returned == 1">
        </p>
        <div>
          <v-ons-button modifier="large" class="edit" @click="editLoan" :disabled="loan.returned == 1">Modifier</v-ons-button>
          <v-ons-button modifier="large" class="delete" @click="deleteLoan" :disabled="loan.returned == 1">Supprimer</v-ons-button>
        </div>
      </ons-col>
    </ons-row>
  </v-ons-page>
</template>

<style scoped>
  #edit-form {
    padding: 30px;
    margin-top: 20px;
    width: 90%;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    background: white;
    text-align: left!important;
  }

  #edit-form ons-input,
  #edit-form textarea,
  #edit-form input[type=date] {
    width: 100%;
    min-width: 100%;
  }

  #edit-form textarea {
    border-radius: 0px;
    border: none;
  }

  #edit-form .edit {
    margin-top: 25px;
  }

  #edit-form .delete {
    background: #e52d2d;
    margin-top: 5px;
  }

  #edit-form textarea {
    background: #e8e8e8;
  }

  #edit-form input[type=date] {
    border: none;
    background: #e8e8e8;
  }
</style>

<script>
  import LoansService from '../../services/LoansService'
  import moment from 'moment'

  export default {
    name: 'LoanDetail',
    template: '#loan-detail-page',
    props: ['id'],
    data() {
      return {
        loan: {},
      }
    },
    created: function() {
      //Load the selected loan
      LoansService.getById(this.id)
        .then(response => {
          this.loan = response.data;
          this.loan.loan_date = moment(this.loan.loan_date).format('YYYY-MM-DD');
        })
    },
    methods: {
      back() {
        this.$router.push({ name: 'Layout'})
      },
      deleteLoan() { 
        this.$ons.notification.confirm('Voulez-vous vraiment supprimer cet emprunt ?')
          .then((response) => {
            // Handle response
            if (+response) {
              LoansService.delete(this.id)
                /* eslint-disable */
                .then(response => {
                  this.$router.push({ name: 'Layout'})
                  this.$ons.notification.alert(`L'emprunt a été supprimé !`)
                })
            }
          });
      },
      editLoan() {

      },
      markAsReimbursed() {
        this.$ons.notification.confirm('Confirmez-vous que ce prêt a bien été remboursé ?')
          .then((response) => {
            // Handle response
            if (+response) {
              LoansService.markLoanAsReturned(this.id)
                /* eslint-disable */
                .then(response => {
                  // We update the loan (as returned)
                  this.loan.returned = 1
                  this.loan.returned_date = moment(moment.now()).format('YYYY-MM-DD')
                });
            }

          });
      }
    },
  }
</script>