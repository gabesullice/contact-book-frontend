var req = new XMLHttpRequest();
req.open("GET", "http://contacts.atendesigngroup.com/v0/contacts", false)
req.send();
resp = JSON.parse(req.response);

new Vue({
  el: "#app",
  data: {
    contacts: resp.data
  }
});
