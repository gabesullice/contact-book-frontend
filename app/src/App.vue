<template>
  <div id="app" class="container">
    <div class="row header">
      <div class="logo-container col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2">
        <img src="dist/assets/logo-aten.svg" class="logo">
      </div>
    </div>
    <div class="row">
      <form class="col-md-8 col-md-offset-2">
        <div class="form-group form-group-lg">
          <label for="contact-filter" class="sr-only">Filter</label>
          <input id="contact-filter" v-model="filterTerm" type="text" class="form-control" placeholder="Type to filter...">
        </div>
      </form>
    </div>
    <div class="row">
      <div class="contact-list col-md-8 col-md-offset-2">
        <contact-component v-for="contact in filteredContacts" :contact="contact"></contact-component>
      </div>
    </div>
  </div>
</template>

<script>
import Contact from './contact-component.vue'

export default {
  components: { 
    'contact-component': Contact
  },
  data () {
    return {
      filterTerm: '',
      contacts: [],
    }
  },
  computed: {
    filteredContacts () {
      return this.contacts.filter(contact => {
        var fN, lN, n;
        fN = contact.attributes.firstName.indexOf(this.filterTerm) !== -1
        lN = contact.attributes.lastName.indexOf(this.filterTerm) !== -1
        n = contact.attributes.name.indexOf(this.filterTerm) !== -1
        return fN || lN || n
      })
    }
  },
  mounted () {
    this.$http.get('http://contacts.atendesigngroup.com/v0/contacts').then(function (resp) {
      var contacts = JSON.parse(resp.body);
      this.$nextTick(() => {
        this.contacts = contacts.data;
      })
    }, function (resp, status, req) {
      console.log("Failed to fetch contacts.", resp);
    });
  }
}
</script>

<style>
</style>
