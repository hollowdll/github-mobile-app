import {
  Text,
  Box,
  Heading,
  HStack,
  VStack,
  Button,
  ButtonText,
  ChevronLeftIcon,
  ChevronRightIcon,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { ScrollView, StyleSheet } from "react-native";
import { Repository } from "../types/repository";
import React, { useState, useEffect, useRef } from "react";
import { convertToLocaleDateString } from "../utility/date";

const REPOS_PER_PAGE = 10;
const DEFAULT_PAGE_NUMBER = 1;

// Shows user repositories
export default function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true
    });
  }

  const setPage1Repos = () => {
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
  }

  const setPage2Repos = () => {
    setRepositories(
      [
        { id: 1, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "Java" } as Repository,
        { id: 2, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "Rust" } as Repository,
        { id: 3, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 4, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 5, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 6, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 7, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 8, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 9, name: "Test repo 3", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 10, name: "Page 2", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
      ]
    );
  }

  const setPage3Repos = () => {
    setRepositories(
      [
        { id: 1, name: "Page 3 repo", description: "Test Desc", createdAt: new Date(Date.now()), language: "Java" } as Repository,
        { id: 2, name: "testest", description: "Test Desc", createdAt: new Date(Date.now()), language: "Rust" } as Repository,
        { id: 3, name: "yo", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
        { id: 4, name: "sup bro", description: "Test Desc", createdAt: new Date(Date.now()), language: "C#" } as Repository,
      ]
    );
  }

  // User goes to previous page
  const handleOnPreviousPage = () => {
    if (page === 2) setPage1Repos();
    else if (page === 3) setPage2Repos();
    else if (page === 4) setPage3Repos();

    if (page <= DEFAULT_PAGE_NUMBER) setPage(DEFAULT_PAGE_NUMBER)
    else setPage(page => page - 1);

    scrollToTop();
  }

  // User goes to next page
  const handleOnNextPage = () => {
    if (page === 1) setPage2Repos()
    else if (page === 2) setPage3Repos();

    setPage(page => page + 1);

    scrollToTop();
  }

  // test data
  useEffect(() => {
    setPage1Repos();
  }, []);

  return (
    <Box m="$3">
      <ScrollView ref={scrollRef}>
        {repositories.map((item, _index) => (
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
          <Button isDisabled={page === DEFAULT_PAGE_NUMBER} onPress={handleOnPreviousPage}>
            <ButtonIcon as={ChevronLeftIcon} />
            <ButtonText> Previous</ButtonText>
          </Button>
          <Text mt="$2" style={styles.info}>Page { page }</Text>
          <Button isDisabled={repositories.length !== REPOS_PER_PAGE} onPress={handleOnNextPage}>
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
