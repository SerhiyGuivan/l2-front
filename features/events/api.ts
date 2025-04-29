
import type {PostgrestSingleResponse} from "@supabase/postgrest-js";
import type {
  CreateParticipationPayload,
  EventData,
  Participation,
  UpdateParticipationPayload
} from "~/features/events/types";

export const fetchEvents = async (sb: ReturnType<typeof useSupabaseClient>) => {
  const { data, error }: PostgrestSingleResponse<EventData[]> = await sb
    .from('events')
    .select(`
      id,
      name,
      date,
      description,
      closed,
      image,
      servers (
        id,
        name,
        rate
      )
    `)
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

export const fetchEvent = async (sb: ReturnType<typeof useSupabaseClient>, eventId: string) => {
  const {data, error}: PostgrestSingleResponse<EventData> = await sb
    .from('events')
    .select(`
      id,
      name,
      date,
      description,
      content,
      closed,
      result,
      image,
      servers (
        id,
        name,
        rate
      )
    `)
    .eq('id', Number(eventId))
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const fetchParticipants = async (sb: ReturnType<typeof useSupabaseClient>, eventId: string) => {
  const {data, error}: PostgrestSingleResponse<Participation[]> = await sb
    .from('participants')
    .select(`
      id,
      comment,
      classes,
      profiles (
        name
      ),
      participation_statuses (
        id,
        name,
        order,
        type
      )
    `)
    .order('participation_statuses(order)', { ascending: true })
    .eq('event_id', Number(eventId))

  if (error) throw new Error(error.message);
  return data;
}

export const fetchParticipationStatuses = async (sb: ReturnType<typeof useSupabaseClient>) => {
  const {data, error}: PostgrestSingleResponse<Participation['participation_statuses'][]> = await sb
    .from('participation_statuses')
    .select(`
      id,
      name,
      order,
      type
    `)
    .order('order')
  if (error) throw new Error(error.message);
  return data;
}


export const fetchUserParticipation = async (sb: ReturnType<typeof useSupabaseClient>, eventId: string, userId: string) => {
  const {data, error}: PostgrestSingleResponse<Participation | null> = await sb
    .from('participants')
    .select(`
      id,
      comment,
      classes,
      profiles (
        name
      ),
      participation_statuses (
        id,
        name,
        order,
        type
      )
    `)
    .eq('event_id', Number(eventId))
    .eq('profile_id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export const createParticipation = async (sb: ReturnType<typeof useSupabaseClient>, payload: CreateParticipationPayload) => {
  const { data, error } = await sb
    .from('participants')
    .insert(payload)
    .select()
  if (error) throw new Error(error.message);
  return data;
}

export const updateParticipation = async (sb: ReturnType<typeof useSupabaseClient>, id: number, payload: UpdateParticipationPayload) => {
  const { data, error } = await sb
    .from('participants')
    .update(payload)
    .eq('id', Number(id))
    .select()
  if (error) throw new Error(error.message);
  return data;
}

