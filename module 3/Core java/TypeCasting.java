public class TypeCasting {
    public static void main(String[] args) {
        double d = 9.7;
        int i = (int) d; // Narrowing
        System.out.println("Double to int: " + i);

        int j = 10;
        double e = j; // Widening
        System.out.println("Int to double: " + e);
    }
}
