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
        <contact-component v-if="createOpen" :formActive="true" :created="false" v-on:contactCreated="updateContacts()"></contact-component>
        <contact-component v-for="contact in filteredContacts" :contact="contact"></contact-component>
        <div class="new-button-row">
          <div class="new-button-container">
            <a href="" class="new-button" v-on:click.prevent="createOpen = !createOpen"><span class="sr-only">Add New</span><span class="glyphicon glyphicon-plus"></span></a>
          </div>
        </div>
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
      createOpen: false,
      filterTerm: '',
      contacts: [],
    }
  },
  computed: {
    filteredContacts () {
      return this.contacts.filter(contact => {
        var term = this.filterTerm.toLowerCase()
        var fN, lN, n;
        fN = contact.attributes.firstName.toLowerCase().indexOf(term) !== -1
        lN = contact.attributes.lastName.toLowerCase().indexOf(term) !== -1
        n = contact.attributes.name.toLowerCase().indexOf(term) !== -1
        return fN || lN || n
      })
    }
  },
  mounted () {
    this.updateContacts()
  },
  methods: {
    updateContacts () {
      const success = (resp) => {
        var contacts = JSON.parse(resp.body);
        this.$nextTick(() => {
          this.contacts = contacts.data;
          console.log("Contacts updated.");
        });
      }
      const failure = (resp, status, req) => {
        console.log("Failed to fetch contacts.", resp);
      }
      this.$http.get('http://contacts.atendesigngroup.com/v0/contacts').then(success, failure);
    }
  }
}
</script>

<style>
</style>


// vim:ft=html
