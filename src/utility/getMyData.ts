import supabase from "../supabaseClient";

interface IMyDataProps {
  userName: string;
}

export const getMyData = async ({ userName }: IMyDataProps) => {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("nickname", userName)
    .order("created_at", { ascending: false });

  return data;
};
