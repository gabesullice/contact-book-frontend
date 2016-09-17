<template>
  <div class="editor">
    <form class="edit-form form-horizontal" v-on:submit.prevent="save()">
      <div class="form-group">
        <label for="#first-name">First Name</label>
        <input id="first-name" type="text" class="form-control" v-model="contact.attributes.firstName" :required="(mode == 'new')">
      </div>
      <div class="form-group">
        <label for="#last-name">Last Name</label>
        <input id="last-name" type="text" class="form-control" v-model="contact.attributes.lastName" :required="(mode == 'new')">
      </div>
      <div class="form-group">
        <label for="#position">Position</label>
        <input id="position" type="text" class="form-control" v-model="contact.attributes.position" :required="(mode == 'new')">
      </div>
      <div class="form-group">
        <label for="#organization">Organization</label>
        <input id="organization" type="text" class="form-control" v-model="contact.attributes.name" :required="(mode == 'new')">
      </div>
      <div class="form-group">
        <label for="#email">Email</label>
        <input id="email" type="email" class="form-control" v-model="contact.attributes.emails[0]" :required="(mode == 'new')">
      </div>
      <div class="form-group">
        <label for="#phone">Phone</label>
        <input id="phone" type="tel" class="form-control" v-model="contact.attributes.phones[0].number">
      </div>
      <input id="submit" type="submit" class="btn btn-success" value="Save">
    </form>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String
    },
    contact: {
      type: Object,
      default: {
        type: "contacts",
        attributes: {
          firstName: "",
          lastName: "",
          position: "",
          organization: "",
          name: "",
          emails: [],
          phones: [{
            number: ""
          }]
        }
      }
    }
  },
  data () {
    return {
      mode: 'edit',
    }
  },
  methods: {
    save () {
      var body = {
        data: {
          type: "contacts",
          attributes: {
            firstName: this.contact.attributes.firstName,
            lastName: this.contact.attributes.lastName,
            name: this.contact.attributes.name,
            position: this.contact.attributes.position,
            organization: this.contact.attributes.organization,
            emails: this.contact.attributes.emails,
            phones: this.contact.attributes.phones
          }
        }
      }

      switch (this.mode) {
        case 'edit':
          body.data.id = this.contact.id;
          console.log("Sending")
          this.$http.patch("http://contacts.atendesigngroup.com/v0/contacts/" + this.contact.id, body, (resp) => {
            console.log("Success!")
          }, (resp, status, req) => {
            console.log(resp)
          })
          break;
        case 'new':
          this.$http.post("http://contacts.atendesigngroup.com/v0/contacts", body, (resp) => {
            console.log("Success!");
            this.$emit('contactCreated');
            this.contact = this.getDefaultContact()
          }, (resp, status, req) => {
            console.log(resp)
          })
      }
    }
  },
  getDefaultContact () {
    return {
      type: "contacts",
      attributes: {
        firstName: "",
        lastName: "",
        position: "",
        organization: "",
        name: "",
        emails: [],
        phones: [{
          number: ""
        }]
      }
    }
  }
}
</script>

// vim:ft=html
