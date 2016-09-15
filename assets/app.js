var Contact = Vue.extend({
  props: ['contact'],
  template: `
<p><span class="lead">{{ contact.attributes.firstName }} {{ contact.attributes.lastName }}</span>&nbsp;<small>{{ contact.attributes.name }}</small></p>
<p><a href="mailto:{{ contact.attributes.emails[0] }}">{{ contact.attributes.emails[0] }}</a></p>
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
