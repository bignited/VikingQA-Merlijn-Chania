import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginInvalidCredentialsTest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        String baseUrl = System.getenv("BASE_URL");
        if (baseUrl == null || baseUrl.isEmpty()) {
            throw new IllegalStateException("BASE_URL environment variable is not set");
        }
        driver = new ChromeDriver();
        driver.get(baseUrl);
    }

    @Test
    public void testLoginWithInvalidCredentials() {
        // Find and fill username
        WebElement usernameField = driver.findElement(By.id("input-username"));
        usernameField.sendKeys("wronguser");

        // Find and fill password
        WebElement passwordField = driver.findElement(By.id("input-password"));
        passwordField.sendKeys("wrong-password");

        // Click login button
        WebElement loginButton = driver.findElement(By.id("button-login"));
        loginButton.click();

        // Assert error message is displayed
        WebElement errorMessage = driver.findElement(
            By.xpath("//p[contains(text(),'Incorrect Credentials')]")
        );
        assert errorMessage.isDisplayed() : "Error message should be visible";
        assert errorMessage.getText().contains("Incorrect Credentials")
            : "Error should mention incorrect credentials";
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
