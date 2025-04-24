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
      <EventsSingleContent v-if="event.content" :value="event.content" class="events-single__content" />
      <EventsSingleContent  v-if="event.results" :value="event.results" class="events-single__content" />

      <div class="events-single__participation-list participation-list" v-if="participationList.length > 0">
        <div class="participation-list__subheading">Предварительные участники ивента</div>
        <DataTable
          :value="participationList">
          <Column field="username" header="Никнейм" :style="{ width: '300px'}"></Column>
          <Column field="classes" header="Желаемый класс"></Column>
          <Column field="comment" header="Комментарий"></Column>
          <Column field="presence" header="Статус" :style="{ width: '300px'}">
            <template #body="slotProps">
              <Tag :size="'small'" :severity="slotProps.data.presence.type">{{ slotProps.data.presence.label}}</Tag>
            </template>
          </Column>
        </DataTable>
      </div>

      <div
        v-if="isVisibleSubmitParticipationActions"
        class="events-single__actions" >
        <Button
          :severity="'success'"
          @click="setIsVisibleSubmitParticipationDialog(true)">Принять участие в ивенте</Button>
      </div>

      <div
        v-if="isVisibleUpdateParticipationActions"
        class="events-single__actions" >
        <Button  @click="setIsVisibleSubmitParticipationDialog(true)" :severity="'secondary'">Обновить информацию</Button>
      </div>
      <Dialog
        v-model:visible="isVisibleSubmitParticipationDialog"
        modal
        :header="'Принять участие в ивенте'"
        :style="{ maxWidth: '360px', width: '100%' }">
        <Form
          :initial-values="initialSubmitParticipationFormData"
          @submit="submitParticipation"
          :resolver="resolver"
          class="participation__form">
          <FormField
            v-slot="$field"
            name="presence"
            class="participation__form-field">
            <Select
              name="presence"
              :options="presences"
              optionValue="documentId"
              optionLabel="label"
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
              :options="classOptions"
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
            :loading="isLoadingSubmitParticipation"
            :disabled="isLoadingSubmitParticipation"
            fluid/>
        </Form>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSubmitParticipation} from "~/features/events/useSubmitParticipation";
import {usePresences} from "~/features/events/usePresences";
import {useEventSingle} from "~/features/events/useEventSingle";
import EventsSingleContent from "~/features/events/EventsSingleContent.vue";
import EventsSingleHeader from "~/features/events/EventsSingleHeader.vue";

const router = useRouter();

const {
  event,
  participationList,
  userParticipation,
  error,
  refresh
} = useEventSingle()

const {
  classOptions,
    initialSubmitParticipationFormData,
    isVisibleSubmitParticipationActions,
    isVisibleUpdateParticipationActions,
    isVisibleSubmitParticipationDialog,
    isLoadingSubmitParticipation,
    setIsVisibleSubmitParticipationDialog,
    resolver,
    submitParticipation,
} = useSubmitParticipation(event, userParticipation, refresh)

const {
  presences
} = usePresences();

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
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
}

</style>