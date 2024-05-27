"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
	const router = useRouter();
	const searchParam = useSearchParams();
	const promptId = searchParam.get("id");
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: "", tag: "" });
	useEffect(() => {
		const getPrimptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();
			setPost({ prompt: data.prompt, tag: data.tag });
		};
		if (promptId) getPrimptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		if (!promptId) return alert("Prompt ID not found");
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});
			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Edit"
			submitting={submitting}
			post={post}
			setPost={setPost}
			handleSubmit={updatePrompt}
		></Form>
	);
};

export default UpdatePrompt;
