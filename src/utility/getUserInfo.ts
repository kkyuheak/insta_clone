import supabase from "../supabaseClient";

export const getUserInfo = async ({ userName }: { userName: string }) => {
  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("nickname", userName);

  return data;
};
