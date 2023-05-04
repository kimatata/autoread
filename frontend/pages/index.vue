<template>
  <div class="container-fluid">

    <!-- url input -->
    <div class="row mt-5">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <label class="form-text" for="siteUrlInput">type any website's url you want to read as video.</label>
        <form>
          <div class="input-group">
            <input type="url" class="form-control" id="siteUrlInput">
            <div class="btn ar-btn-primary" @click="onStartClicked">start</div>
          </div>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>

    <div class="row mt-5">
      <div class="col-md-9 bg-light">
        {{ data }}
      </div>
      <div class="col-md-3 bg-light">
        Play list..
      </div>
    </div>
  </div>
</template>

<script setup>
const data = ref(null)

async function onStartClicked() {
  // data.value = await useFetch('http://localhost:3001/', {
  //   method: 'GET',
  //   mode: 'no-cors',
  // })
  const data2 = await fetch('http://localhost:3001/')
  console.log(await data2.json())
}

</script>