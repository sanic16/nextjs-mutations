import CreatePostForm from "@/components/forms/CreatePostForm";
import { createPost } from "@/actions/posts";
import { getUser, verifyAuth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await verifyAuth();

  if (!user.user?.id) {
    redirect("/auth");
  }

  return (
    <section>
      <CreatePostForm createPost={createPost} />
    </section>
  );
}
