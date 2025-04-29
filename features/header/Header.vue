<template>
  <div class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">
        <span>Rebel</span> Legion
      </NuxtLink>
      <template v-if="!user">
        <Button
          :size="'small'"
          icon="pi pi-sign-in"
          :severity="'success'"
          class="!inline-flex sm:!hidden header__btn"
          @click="onLogin"/>
        <Button
          :severity="'success'"
          class="!hidden sm:!inline-flex header__btn"
          @click="onLogin">Войти</Button>
      </template>

      <div v-if="user" class="header__profile">
        <span class="header__username">{{username}}</span>
        <Button
          :size="'small'"
          icon="pi pi-sign-out"
          :severity="'secondary'"
          class="!inline-flex sm:!hidden header__btn"
          @click="onLogout" />
        <Button
          :severity="'secondary'"
          class="!hidden sm:!inline-flex header__btn"
          @click="onLogout">Выйти</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sb = useSupabaseClient()
const user = useSupabaseUser();
const router = useRouter();

const { data: username, error } = await useAsyncData('username', async () => {
  if (user.value) {

    const { data, error } = await sb
      .from('profiles')
      .select('name')
      .eq('id', user.value.id)
      .single()

    if (error) {
      return null
    }
    return data?.name || null
  }
  return null
}, {watch: [user]})

const onLogin = () => {
  router.push('/login');
}

const onLogout = async () => {
  await sb.auth.signOut();
}
</script>

<style lang="scss" scoped>
  .header {
    background: var(--g-block-bg);
    &__container {
      padding: 15px;
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
    }
    &__logo {
      flex: 1 0 auto;
      @include logo;
      span {
        color: #FCB755
      }
    }
    &__profile {
      flex: 0 1 auto;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &__username {
      flex: 1 1 auto;
      min-width: 0;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &__btn {
      flex: 0 0 auto;
    }
  }
</style>