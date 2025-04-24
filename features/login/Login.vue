<template>
  <div class="login">
    <Form
      :resolver
      @submit="onFormSubmit"
      class="login__form">
      <FormField
        v-slot="$field"
        name="identifier"
        class="login__form-field">
        <InputText
          type="text"
          placeholder="Логин"
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
const router = useRouter()
const { login } = useStrapiAuth();

const toast = useToast();

const resolver = ({ values }) => {
  const errors = { identifier: [], password: [] };

  if (!values.identifier) {
    errors.identifier.push({ type: 'required', message: 'Имя пользователя обязательно.' });
  }

  if (values.identifier?.length < 3) {
    errors.identifier.push({ type: 'minimum', message: 'Имя пользователя должно содержать минимум 3 символа.' });
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
    toast.add({ severity: 'error', summary: 'Form is no valid.', life: 3000 });
    return
  }
  try {
    await login(values);
    router.push('/');

  } catch (e) {
    toast.add({ severity: 'error', summary: e.error.message, life: 3000 });
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