import java.util.Arrays;
import java.util.List;
import java.util.Collections;

public class LambdaSort {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Zara", "Alex", "John", "Bob");

        Collections.sort(names, (s1, s2) -> s1.compareTo(s2));
        System.out.println("Sorted names: " + names);
    }
}
