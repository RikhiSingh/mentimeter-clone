"use server"

import { redis } from "@/lib/redis"
import { redirect } from "next/navigation"

export const createTopic = async ({ topicName }: { topicName: string }) => {

    const regex = /^[a-zA-Z-]+$/

    if (!topicName || topicName.length > 69) {
        return { error: "Name must be between 1 and 69 characters" }
    };

    if (!regex.test(topicName)) {
        return { error: "Only letters and hyphens are allowed in name" }
    };

    await redis.sadd("existing-topics", topicName)

    redirect(`${topicName}`)
}



function wordFreq(text: string): { text: string, value: number }[] {
    const words: string[] = text.replace(/\./g, '').split(/\s/);
    const freqMap: Record<string, number> = {};

    for (const w of words) {
        if (!freqMap[w]) freqMap[w] = 0;
        freqMap[w] += 1;
    }
    return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
}

export const SubmitComment = async ({ comment, topicName }: {
    comment: string
    topicName: string
}) => {

    const words = wordFreq(comment)
    await Promise.all(words.map(async (word) => {
        await redis.zadd(
            `room:${topicName}`,
            { incr: true },
            { member: word.text, score: word.value })
    }))

    await redis.incr("served-requests")

    await redis.publish(`room:${topicName}`, words)

    return comment

}