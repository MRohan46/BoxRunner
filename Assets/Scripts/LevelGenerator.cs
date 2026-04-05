using UnityEngine;
using System.Collections.Generic;

public class LevelGenerator : MonoBehaviour
{
    public Transform player;

    public GameObject startingChunk;      // Always first
    public GameObject[] groundPrefabs;    // The 15 random ones

    public int chunksAhead = 5;
    public float chunkLength = 10f;

    public float seamFix = 0.01f;

    private float spawnZ = 0f;
    private List<GameObject> activeChunks = new List<GameObject>();

    public GameObject pickupPrefab; // assign in Inspector
    [Range(0f,1f)]
    public float pickupChance = 0.3f; // 30% chance to spawn

    void Start()
    {
        // Spawn starting chunk first
        SpawnStartingChunk();

        // Spawn remaining chunks randomly
        for (int i = 1; i < chunksAhead; i++)
        {
            SpawnRandomChunk();
        }
        Renderer r = startingChunk.GetComponentInChildren<Renderer>();
    }


    void Update()
    {
        if (player.position.z + (chunksAhead * chunkLength) > spawnZ)
        {
            SpawnRandomChunk();
            DeleteOldChunk();
        }
    }
    

    void SpawnStartingChunk()
    {
        GameObject chunk = Instantiate(
            startingChunk,
            new Vector3(0, 0, spawnZ),
            Quaternion.identity
        );

        activeChunks.Add(chunk);
        spawnZ += chunkLength;
        
    }

    void SpawnRandomChunk()
    {
        int randomIndex = Random.Range(0, groundPrefabs.Length);

        GameObject chunk = Instantiate(
            groundPrefabs[randomIndex],
            new Vector3(0, 0, spawnZ),
            Quaternion.identity
        );

        activeChunks.Add(chunk);

        // --- PICKUP SPAWN ---
        if (Random.value < pickupChance) // Random.value gives 0-1
        {
            // Pick a random local position on the chunk
            Vector3 pickupPos = chunk.transform.position;
            
            // Assuming chunk width ~ 10 units, tweak as needed
            float xOffset = Random.Range(-4f, 4f);
            float yOffset = 1f; // float above the ground
            pickupPos += new Vector3(xOffset, yOffset, 0f);

            Instantiate(pickupPrefab, pickupPos, Quaternion.identity);
        }

        spawnZ += chunkLength - seamFix;
    }

    void DeleteOldChunk()
    {
        if (activeChunks.Count < 3)
            return;

        GameObject firstChunk = activeChunks[0];
        GameObject secondChunk = activeChunks[1];

        // Delete only when player passed second chunk
        if (player.position.z > secondChunk.transform.position.z + chunkLength)
        {
            Destroy(firstChunk);
            activeChunks.RemoveAt(0);
        }
    }
}