<template id="add-loan-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left back">
        <v-ons-toolbar-button @click="back">
          <v-ons-icon icon="fa-chevron-left" class="list-item__icon"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center title">Ajouter un nouveau prêt</div>
    </v-ons-toolbar>

    <ons-row id="add-form">
      <ons-col width="100%">
        <p>
          <label for="borrower_name">Nom de l'emprunteur</label><br>
          <v-ons-input type="text" id="borrower_name" modifier="underbar" v-model="loan.borrower_name" float></v-ons-input>
        </p>
        <p>
          <label for="amount">Montant</label><br>
          <v-ons-input type="number" step=".01" id="amount" modifier="underbar" v-model="loan.amount" float></v-ons-input>
        </p>
        <p>
          <label for="note">Note personnelle</label><br>
          <textarea id="note" class="textarea" rows="3" v-model="loan.note" float></textarea>
        </p>
        <p>
          <label for="loan_date">Date du prêt</label><br>
          <input type="date" id="loan_date"
            v-model="loan.loan_date">
        </p>
        <div>
          <v-ons-button modifier="large" class="add" @click="addLoan">Ajouter</v-ons-button>
        </div>
      </ons-col>
    </ons-row>
  </v-ons-page>
</template>

<style scoped>
  #add-form {
    padding: 30px;
    margin-top: 20px;
    width: 90%;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    background: white;
    text-align: left!important;
  }

  #add-form ons-input,
  #add-form textarea,
  #add-form input[type=date] {
    width: 100%;
    min-width: 100%;
  }

  #add-form textarea {
    border-radius: 0px;
    border: none;
  }

  #add-form .add {
    margin-top: 25px;
  }

  #add-form textarea {
    background: #e8e8e8;
  }

  #add-form input[type=date] {
    border: none;
    background: #e8e8e8;
  }
</style>

<script>
  import LoansService from '../../services/LoansService'
  import moment from 'moment'

  export default {
    name: 'AddLoan',
    template: '#add-loan-page',
    props: ['id'],
    data() {
      return {
        loan: {
          borrower_name: '',
          amount: 0.05,
          note: '',
          loan_date: moment(moment.now()).format('YYYY-MM-DD'),
        },
      }
    },
    methods: {
      back() {
        this.$router.push({ name: 'Layout'})
      },
      addLoan() {
        LoansService.add(this.loan)
          /* eslint-disable */
          .then(response => {
            this.$router.push({ name: 'Layout'})
            this.$ons.notification.alert(`L'emprunt a été ajouté !`)
          })
          .catch(err => {
            let response = err.response;
            
            if (response.status && response.status === 401) {
                //Wrong credentials
                if (response.data.error) {
                  this.$ons.notification.alert(response.data.error)
                }

                //validation rules error
                let rule = response.data[0];
                if (rule) {
                  this.$ons.notification.alert(`${rule.message} !`)
                }
            }
          })
      }
    },
  }
</script>