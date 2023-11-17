import {
  Text,
  Box,
  Heading,
  HStack,
  VStack,
} from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Repository } from "../types/repository";
import { useState, useEffect } from "react";
import { convertToLocaleDateString } from "../utility/date";

// Shows user repositories
export default function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // test data
  useEffect(() => {
    setRepositories(
      [
        { id: 1, name: "Test repo 1", description: "Test Desc", createdAt: new Date(Date.now()), language: "Java" } as Repository,
        { id: 2, name: "Test repo 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "Rust" } as Repository,
        { id: 3, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 4, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 5, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 6, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 7, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 8, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 9, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 10, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
      ]
    );
  }, []);

  return (
    <Box m="$3">
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="$1"
            py="$2"
            borderColor="$trueGray800"
          >
            <HStack space="md" justifyContent="space-between">
              <VStack>
                <Heading>{ item.name }</Heading>
                <Text style={styles.info}>{ item.description }</Text>
                <Text>Created: { convertToLocaleDateString(item.createdAt) }</Text>
                <Text>Most used language: { item.language }</Text>
              </VStack>
            </HStack>
          </Box>
        )}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  info: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
