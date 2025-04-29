<template>
  <div v-if="event" class="events-single">
    <EventsSingleHeader
      :date="event.date"
      :img="event.img"
      :title="event.title"
      :tags="event.tags"
      class="events-single__header"
      @return="onReturn"/>
    <div class="events-single__body">
      <EventsSingleContent v-if="event.content && !event.closed" :value="event.content" class="events-single__content" />
      <EventsSingleContent v-if="event.result" :value="event.result" class="events-single__content" />
      <template v-if="viewport.isLessThan('tablet')">
        <div class="events-single__participation-list participation-list" v-if="participationList.length > 0">
          <div class="participation-list__subheading">Предварительные участники ивента</div>
          <DataTable
            :value="participationList">
            <Column field="username" header="Никнейм" >
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.username }}
                  <span
                    v-if="slotProps.data.classes"
                    class="participation-cell__classes">{{ slotProps.data.classes }}</span>
                </div>
                <div
                  v-if="slotProps.data.comment"
                  class="participation-cell__comment">{{ slotProps.data.comment }}</div>
              </template>
            </Column>
            <Column field="presence" header="Статус">
              <template #body="slotProps">
                <Tag :size="'small'" :severity="slotProps.data.status.type">{{ slotProps.data.status.name}}</Tag>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
      <template v-else>
        <div class="events-single__participation-list participation-list" v-if="participationList.length > 0">
          <div class="participation-list__subheading">Предварительные участники ивента</div>
          <DataTable
            :value="participationList">
            <Column field="username" header="Никнейм"></Column>
            <Column field="classes" header="Желаемый класс"></Column>
            <Column field="comment" header="Комментарий"></Column>
            <Column field="presence" header="Статус">
              <template #body="slotProps">
                <Tag :size="'small'" :severity="slotProps.data.status.type">{{ slotProps.data.status.name}}</Tag>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
      <div
        v-if="participationAction.isVisible"
        class="events-single__actions" >
        <Button
          :severity="participationAction.type"
          @click="participationAction.handler">{{ participationAction.label}}</Button>
      </div>

      <Dialog
        v-model:visible="isVisibleDialog"
        modal
        :header="'Принять участие в ивенте'"
        :style="{ maxWidth: '360px', width: '100%' }">
        <Form
          @submit="submitParticipation"
          :initial-values="initialFormData"
          :resolver="formResolver"
          class="participation__form">
          <FormField
            v-slot="$field"
            name="status_id"
            class="participation__form-field">
            <Select
              name="status_id"
              :options="participationStatuses"
              optionValue="id"
              optionLabel="name"
              placeholder="Выберите статус"
              fluid />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple">{{ $field.error?.message }}</Message>
          </FormField>

          <FormField
            name="classes"
            class="participation__form-field">
            <Select
              showClear
              name="classes"
              :options="classesList"
              placeholder="Желаемый класс"
              fluid />
          </FormField>


          <FormField
            name="comment"
            class="participation__form-field">
            <Textarea name="comment" rows="3"  style="resize: none" fluid placeholder="Комментарий" class="flex"/>
          </FormField>
          <Button
            type="submit"
            severity="secondary"
            label="Подтвердить"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            fluid/>
        </Form>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useEventSingle} from "~/features/events/useEventSingle";
import EventsSingleContent from "~/features/events/EventsSingleContent.vue";
import EventsSingleHeader from "~/features/events/EventsSingleHeader.vue";

const router = useRouter();

const viewport = useViewport()

const {
  event,
  participationList,
  isVisibleDialog,
  participationAction,
  isSubmitting,
  participationStatuses,
  classesList,
  initialFormData,
  formResolver,
  submitParticipation,
  error,
} = useEventSingle()

const onReturn = async () => {
  await router.push("/events");
}

</script>

<style lang="scss" scoped>
.events-single{
  padding: 30px 0;
  &__header {
    margin-bottom: 30px;
  }
  &__body {
    padding: 0 15px;
    max-width: 1320px;
    margin: 0 auto;
  }
  &__content {
    margin-bottom: 30px;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }
  &__participation-list {
    margin-bottom: 30px;
  }
}

.participation__form-field {
  margin-bottom: 20px;
}

.participation-list__subheading {
  @include heading-3;
  margin-bottom: 30px;
}

.participation-cell__classes {
  color: var(--p-primary-color);
}
.participation-cell__comment {
  color: var(--p-text-muted-color);;
}


</style>