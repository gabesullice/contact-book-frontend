var Contact = Vue.extend({
  props: ['contact'],
  template: `
<div class="names inline-block">
  <p class="name"><span class="lead">{{ contact.attributes.firstName }} {{ contact.attributes.lastName }}</span></p>
  <p class="organization">{{ contact.attributes.name }}</p>
</div>
<div class="addresses inline-block pull-right">
  <p class="email"><a href="mailto:{{ contact.attributes.emails[0] }}">{{ contact.attributes.emails[0] }}</a></p>
  <p class="phone"><a href="tel:{{ contact.attributes.phones[0].number }}">{{ contact.attributes.phones[0].number }}</a></p>
</div>
<div class="pencil-container">
  <span class="glyphicon glyphicon-pencil edit-icon" aria-hidden="true"></span>
</div>
`
});
Vue.component('app-contact', Contact)

new Vue({
  el: "#app",
  data: function () {
    return {
      filterTerm: '',
      contacts: []
    }
  },
  ready: function () {
    this.$http.get('http://contacts.atendesigngroup.com/v0/contacts').then(function (resp) {
      var contacts = JSON.parse(resp.body);
      this.contacts = contacts.data;
    }, function (resp, status, req) {
      console.log("Failed to fetch contacts.", resp);
    });
  }
});
