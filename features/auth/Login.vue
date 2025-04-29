<template>
  <div class="login">
    <Form
      :resolver
      @submit="onFormSubmit"
      class="login__form">
      <FormField
        v-slot="$field"
        name="email"
        class="login__form-field">
        <InputText
          type="text"
          placeholder="Email"
          fluid/>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple">{{ $field.error?.message }}</Message>
      </FormField>
      <FormField
        v-slot="$field"
        name="password"
        class="login__form-field">
        <Password
          type="text"
          placeholder="Пароль"
          :feedback="false"
          toggleMask
          fluid/>
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
      </FormField>
      <div class="login__actions">
        <Button type="submit" :severity="'success'" label="Войти" fluid/>
      </div>

      <div class="login__links">
        <NuxtLink to="/register" class="link">Создать новый аккаунт</NuxtLink>
      </div>
    </Form>
  </div>
</template>

<script lang="js" setup>
import { useToast } from 'primevue/usetoast';
const router = useRouter();
const sb = useSupabaseClient();

const toast = useToast();

const resolver = ({ values }) => {
  const errors = { email: [], password: [] };

  if (!values.email) {
    errors.email.push({ type: 'required', message: 'Email обязателен.' });
  } else {
    // Проверка: формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email.push({ type: 'format', message: 'Некорректный формат email.' });
    }
  }

  if (!values.password) {
    errors.password.push({ type: 'required', message: 'Пароль обязателен.' });
  }

  if (values.password?.length < 6) {
    errors.password.push({ type: 'minimum', message: 'Пароль должен содержать минимум 6 символов.' });
  }

  return {
    values,
    errors
  };
};

const onFormSubmit = async ({valid, values}) => {
  if (!valid) {
    toast.add({ severity: 'error', summary: 'Введите коректные данные.', life: 3000 });
    return
  }
  try {
    const res = await sb.auth.signInWithPassword(values);
    router.push('/');

  } catch (e) {
    toast.add({ severity: 'error', summary: e, life: 3000 });
  }
}
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
}
.login__form {
  max-width: 320px;
  flex: 1 1 auto;
}
.login__form-field {
  margin-bottom: 15px;
}
.login__actions {
  margin-bottom: 15px;
}
.login__links {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>