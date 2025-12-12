import { db } from "./firebase";
import { doc, getDoc, updateDoc, increment, setDoc, collection, getDocs } from "firebase/firestore";

// Number of shards for distributed counters
// 10 shards = supports ~10 writes/second. Increase for higher concurrency.
const NUM_SHARDS = 10;

interface CounterStats {
    count: number;
}

// Initialize shards (Run manually or lazy load)
export async function createCounter(ref: any) {
    const batch = [];
    // Initialize shards
    for (let i = 0; i < NUM_SHARDS; i++) {
        const shardRef = doc(collection(ref, "shards"), i.toString());
        await setDoc(shardRef, { count: 0 });
    }
}

// Increment a distributed counter
export async function incrementDistributedCounter(docId: string, collectionName: string = "tests") {
    const shardId = Math.floor(Math.random() * NUM_SHARDS).toString();
    const shardRef = doc(db, collectionName, docId, "shards", shardId);

    try {
        await updateDoc(shardRef, {
            count: increment(1)
        });
    } catch (error: any) {
        // If shard doesn't exist, create it (Lazy Initialization)
        if (error.code === 'not-found') {
            await setDoc(shardRef, { count: 1 });
        } else {
            console.error("Counter increment failed", error);
        }
    }
}

// Get total count by aggregating shards
export async function getDistributedCount(docId: string, collectionName: string = "tests"): Promise<number> {
    const shardsColl = collection(db, collectionName, docId, "shards");
    const querySnapshot = await getDocs(shardsColl);
    let totalCount = 0;

    querySnapshot.forEach((doc) => {
        totalCount += doc.data().count || 0;
    });

    return totalCount;
}
