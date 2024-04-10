<template>
  <header class="header">
    <div class="header__logo">
      <a href="#">
        <router-link to="/">
          <img src="../assets/logo.svg" alt="Logo" class="logo__img" />
        </router-link>
      </a>
      <div class="logo__title">Quiz chemistry</div>
    </div>
    <nav class="header__nav__wrapper">
      <div class="header__nav">
        <div class="header__user">
          <div class="header__user__info">{{ $store.state.user.name }}</div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  background-color: rgb(0, 0, 0, 0.5);
}

.header__logo {
  display: flex;
  align-items: center;
  margin-left: 35px;
  padding: 5px;
  border-radius: 20px;
}

.logo__img {
  width: 25px;
  height: 25px;
}

.logo__title {
  padding-left: 5px;
}

.header__nav__wrapper {
}

.header__nav {
  margin-right: 35px;
  display: flex;
  align-items: center;
}

.header__nav__login {
  margin-right: 15px;
}
.header__nav__reg {
  margin-right: 15px;
}
.header__user {
  padding-left: 15px;
}
.header__user__info {
}
</style>
