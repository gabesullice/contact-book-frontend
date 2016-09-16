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
    <form class="form-horizontal">
      <div class="form-group col-md-6 col-offset-md-3">
        <label for="#first-name">First Name</label>
        <input id="first-name" type="text" class="form-control">
      </div>
      <div class="form-group col-md-6 col-offset-md-3">
        <label for="#last-name">Last Name</label>
        <input id="last-name" type="text" class="form-control">
      </div>
      <div class="form-group col-md-6 col-offset-md-3">
        <label for="#email">Email</label>
        <input id="email" type="email" class="form-control">
      </div>
      <input id="submit" type="submit" value="Save" class="btn btn-success">
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
    }
  }
}
</script>

<style>
</style>
