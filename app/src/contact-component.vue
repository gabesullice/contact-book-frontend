<template>
<div class="contact">
  <div class="names inline-block">
    <p class="name"><span class="lead">{{ contact.attributes.firstName }} {{ contact.attributes.lastName }}</span></p>
    <p class="organization">{{ contact.attributes.name }}</p>
  </div>
  <div class="addresses inline-block pull-right">
    <p class="email"><a :href="'mailto:' + contact.attributes.emails[0]">{{ contact.attributes.emails[0] }}</a></p>
    <p class="phone"><a :href="'tel:' + contact.attributes.phones[0].number">{{ contact.attributes.phones[0].number }}</a></p>
  </div>
  <div class="pencil-container" v-on:click="toggleEdit()">
    <span class="glyphicon glyphicon-pencil edit-icon" aria-hidden="true"></span>
  </div>
  <div class="editor" v-if="editOpen">
    <form class="edit-form form-horizontal">
      <div class="form-group">
        <label for="#first-name">First Name</label>
        <input id="first-name" type="text" class="form-control" v-model="contact.attributes.firstName">
      </div>
      <div class="form-group">
        <label for="#last-name">Last Name</label>
        <input id="last-name" type="text" class="form-control" v-model="contact.attributes.lastName">
      </div>
      <div class="form-group">
        <label for="#email">Email</label>
        <input id="email" type="email" class="form-control" v-model="contact.attributes.emails[0]">
      </div>
      <div class="form-group">
        <label for="#phone">Phone</label>
        <input id="phone" type="tel" class="form-control" v-model="contact.attributes.phones[0].number">
      </div>
      <button id="submit" type="button" class="btn btn-success" v-on:click="updateContact()">Save</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  props: ['contact'],
  data () {
    return {
      editOpen: false
    }
  },
  methods: {
    toggleEdit () {
      this.editOpen = !this.editOpen
    },
    updateContact () {
      const body = {
        "data": {
          "id": this.contact.id,
          "type": "contacts",
          "attributes": {
            "firstName": this.contact.attributes.firstName,
            "lastName": this.contact.attributes.lastName,
            "emails": this.contact.attributes.emails,
            "phones": this.contact.attributes.phones
          }
        }
      }

      this.$http.patch("http://contacts.atendesigngroup.com/v0/contacts/" + this.contact.id, body, (resp) => {
        console.log("Success!")
      }, (resp, status, req) => {
        console.log(resp)
      })
    }
  }
}
</script>

<style>
</style>
