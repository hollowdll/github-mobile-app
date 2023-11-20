import {
  Text,
  Box,
  Heading,
  HStack,
  VStack,
  Button,
  ButtonText,
  ScrollView,
  ChevronLeftIcon,
  ChevronRightIcon,
  ButtonIcon,
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
      <ScrollView>
        {repositories.map((item, index) => (
          <Box borderBottomWidth="$1" py="$2" borderColor="$trueGray800" key={item.id}>
            <HStack space="md" justifyContent="space-between">
              <VStack>
                <Heading>{item.name}</Heading>
                <Text style={styles.info}>{item.description}</Text>
                <Text>Created: {convertToLocaleDateString(item.createdAt)}</Text>
                <Text>Most used language: {item.language}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}
        <HStack mt="$4" space="md" justifyContent="space-between">
          <Button>
            <ButtonIcon as={ChevronLeftIcon} />
            <ButtonText> Previous</ButtonText>
          </Button>
          <Button>
            <ButtonText>Next </ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  info: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
