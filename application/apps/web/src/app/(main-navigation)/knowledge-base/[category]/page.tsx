"use client";

import { useParams } from "next/navigation";

export default function Page() {
	const params = useParams();
	return <p>Post: {JSON.stringify(params, null, 2)}</p>;
}
