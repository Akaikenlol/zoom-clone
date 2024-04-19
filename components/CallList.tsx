//@ts-nocheck

"use client";

import { useGetCalls } from "@/hooks/useGetCall";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
	const { endedCalls, upcomingCalls, callRecordings, isLoading } =
		useGetCalls();
	const router = useRouter();
	const [recordings, setRecordings] = useState<CallRecording[]>([]);

	const getCalls = () => {
		switch (type) {
			case "ended":
				return endedCalls;
			case "upcoming":
				return upcomingCalls;
			case "recordings":
				return callRecordings;
			default:
				return [];
		}
	};

	const getNoCallMessage = () => {
		switch (type) {
			case "ended":
				return "No Previous Calls";
			case "upcoming":
				return "No Upcoming Calls";
			case "recordings":
				return "No Recordings";
			default:
				return "";
		}
	};

	const calls = getCalls();
	const noCallsMessage = getNoCallMessage();

	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			{calls && calls.length > 0 ? (
				calls.map((meeting: Call | CallRecording) => (
					<MeetingCard
						key={(meeting as Call).id}
						icon={
							type === "ended"
								? "/icons/previous.svg"
								: type === "upcoming"
								? "icons/upcoming.svg"
								: "/icons/recordings.svg"
						}
						title={
							(meeting as Call).state.custom.description.substring(0, 20) ||
							"No description"
						}
						date={
							meeting.state.startedAt?.toLocaleString() ||
							meeting.start_time?.toLocaleString()
						}
						isPreviousMeeting={""}
						handleClick={() => {}}
						link={""}
						buttonText=""
					/>
				))
			) : (
				<h1>{noCallsMessage}</h1>
			)}
		</div>
	);
};

export default CallList;
