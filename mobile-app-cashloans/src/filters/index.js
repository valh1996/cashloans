import Vue from "vue"

Vue.filter("twoDecimal", amount => {
  const amt = Number(amount)
  return amt.toFixed(2)
})