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
  <div class="pencil-container">
    <span class="glyphicon glyphicon-pencil edit-icon" aria-hidden="true"></span>
  </div>
</div>
</template>

<script>
export default {
  props: ['contact']
}
</script>

<style>
</style>
