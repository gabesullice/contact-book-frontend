var Contact = Vue.extend({
  props: ['contact'],
  template: `
<div class="inline-block">
  <p class="name"><span class="lead">{{ contact.attributes.firstName }} {{ contact.attributes.lastName }}</span></p>
  <p class="organization">{{ contact.attributes.name }}</p>
</div>
<div class="inline-block pull-right">
  <p class="email"><a href="mailto:{{ contact.attributes.emails[0] }}">{{ contact.attributes.emails[0] }}</a></p>
  <p class="phone"><a href="tel:{{ contact.attributes.phones[0].number }}">{{ contact.attributes.phones[0].number }}</a></p>
</div>
<div class="pencil-container">
  <span class="glyphicon glyphicon-pencil edit-icon" aria-hidden="true"></span>
</div>
`
});
Vue.component('app-contact', Contact)

var req = new XMLHttpRequest();
req.open("GET", "http://contacts.atendesigngroup.com/v0/contacts", false)
req.send();
resp = JSON.parse(req.response);
console.log(resp);

new Vue({
  el: "#app",
  data: {
    filterTerm: '',
    contacts: resp.data
  }
});
