<template>
<div class="contact">
  <div v-if="created" class="names inline-block">
    <p class="name"><span class="lead">{{ contact.attributes.firstName }} {{ contact.attributes.lastName }}</span></p>
    <p class="position">{{ contact.attributes.position }}</p>
    <p class="organization">{{ contact.attributes.name }}</p>
  </div>
  <div v-if="created" class="addresses inline-block pull-right">
    <p class="email"><a :href="'mailto:' + contact.attributes.emails[0]">{{ contact.attributes.emails[0] }}</a></p>
    <p class="phone"><a :href="'tel:' + contact.attributes.phones[0].number">{{ contact.attributes.phones[0].number }}</a></p>
  </div>
  <contact-form v-if="formActive" :mode="created ? 'edit' : 'new'" :contact="getContactCopy()" v-on:contactCreated="$emit('contactCreated'); formActive = false"></contact-form>
  <div class="pencil-container" v-on:click="toggleEdit()">
    <span class="glyphicon glyphicon-pencil edit-icon" aria-hidden="true"></span>
  </div>
</div>
</template>

<script>
import ContactForm from './contact-form.vue'
export default {
  components: { 
    'contact-form': ContactForm
  },
  props: {
    formActive: {
      type: Boolean,
      default: false
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
    },
    created: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    toggleEdit () {
      this.formActive = !this.formActive
    },
    getContactCopy() {
      return {
        id: this.contact.id,
        type: "contacts",
        attributes: {
          firstName: this.contact.attributes.firstName,
          lastName: this.contact.attributes.lastName,
          position: this.contact.attributes.position,
          organization: this.contact.attributes.organization,
          name: this.contact.attributes.name,
          emails: this.contact.attributes.emails,
          phones: this.contact.attributes.phones
        }
      }
    }
  },
}
</script>

<style>
</style>

// vim:ft=html
