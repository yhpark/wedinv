export type Rsvp = {
  id: string;
  msg: string;
  created: number;
};

export type PostRsvpRequest = {
  id: string;
  msg: string;
}
export type PostRsvpResponse = { id: string };
