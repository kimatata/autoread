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
            <button type="submit" class="btn btn-primary">start</button>
          </div>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>

    <div class="row mt-5">
      <div class="col-md-9 bg-light">
        video pane
      </div>
      <div class="col-md-3 bg-light">
        Play list..
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped></style>