<template>
  <div class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">
        <span>Rebel</span> Legion
      </NuxtLink>

      <Button
        v-if="!user"
        :severity="'success'"
        @click="onLogin">Войти</Button>

      <div v-if="user" class="header__profile">
        <span class="header__hi"> Привет! <strong>{{user.username}}</strong> </span>
        <Button :severity="'success'" @click="onLogout">Выйти</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useStrapiUser()
const { logout } = useStrapiAuth()
const router = useRouter();

const onLogin = () => {
  router.push('/login');
}

const onLogout = () => {
  logout();
}
</script>

<style lang="scss" scoped>
  .header {
    background: var(--g-block-bg);
    &__hi {
      font-size: 16px;
    }
    &__container {
      padding: 15px;
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
    }
    &__logo {
      font-size: 36px;
      font-weight: bold;
      span {
        color: #FCB755
      }
    }
    &__profile {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 20px;
    }
  }
</style>