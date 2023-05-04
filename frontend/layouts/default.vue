<template>
  <div>
    <div>
      <nav class="navbar shadow">
        <div class="container-fluid">
          <NuxtLink :to="'/'" class="navbar-brand" >
            <img src="/autoread.png" alt="AutoRead" width="30"/>
            <span class="ms-2">AutoRead</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
    <slot />
  </div>
</template>