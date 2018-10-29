<template>
  <div class="about">
    <h1>This is a protected page</h1>
    <h2>hello: {{ hello }}</h2>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      hello: undefined
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getProtectedAPI () {
      fetch('http://localhost:3000/protected/get-some-info',{
            credentials: 'include',
          }).then(res => res.text())
          .then(body => {
            console.dir(body)
            this.hello = JSON.parse(body).hello
          })
    },
  },
  created() {
    this.getProtectedAPI()
  }
}
</script>
