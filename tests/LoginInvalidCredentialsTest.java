import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;

/**
 * Standalone Selenium/JUnit 5 reference implementation.
 *
 * Prerequisites (no Maven/Gradle required):
 *   - JUnit 5 standalone console launcher JAR on the classpath
 *   - Selenium Java JAR on the classpath
 *   - ChromeDriver binary matching your installed Chrome version
 *
 * The target URL is read from the BASE_URL environment variable (or the
 * base.url system property as a fallback), so no value is hardcoded here.
 *
 * Run (example):
 *   javac -cp selenium-java.jar:junit-platform-console-standalone.jar LoginInvalidCredentialsTest.java
 *   BASE_URL=http://... \
 *   java  -cp .:selenium-java.jar:junit-platform-console-standalone.jar \
 *         org.junit.platform.console.ConsoleLauncher --select-class=LoginInvalidCredentialsTest
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class LoginInvalidCredentialsTest {

    private static String baseUrl() {
        String url = System.getenv("BASE_URL");
        if (url == null || url.isBlank()) {
            url = System.getProperty("base.url");
        }
        if (url == null || url.isBlank()) {
            throw new IllegalStateException(
                    "BASE_URL environment variable (or -Dbase.url system property) must be set");
        }
        return url;
    }

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get(baseUrl());
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    /**
     * Entering invalid credentials must NOT authenticate the user and must
     * display an "Incorrect Credentials" error message.
     */
    @Test
    @Order(1)
    @DisplayName("should show an error when invalid credentials are entered")
    void shouldShowErrorOnInvalidCredentials() {
        // Arrange
        WebElement usernameInput = driver.findElement(By.id("input-username"));
        WebElement passwordInput = driver.findElement(By.id("input-password"));
        WebElement loginButton   = driver.findElement(By.id("button-login"));

        // Act
        usernameInput.sendKeys("wrong-user");
        passwordInput.sendKeys("wrong-password");
        loginButton.click();

        // Assert — error message is visible
        WebElement error = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.tagName("p"))
        );
        Assertions.assertEquals(
                "Incorrect Credentials",
                error.getText().trim(),
                "Expected error message 'Incorrect Credentials' to be displayed"
        );

        // Assert — login button is still present (user was not redirected)
        Assertions.assertTrue(
                driver.findElement(By.id("button-login")).isDisplayed(),
                "Expected login button to still be visible (user not authenticated)"
        );
    }
}
