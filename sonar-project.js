const scanner =
  require("sonarqube-scanner").default || require("sonarqube-scanner");

try {
  scanner(
    {
      serverUrl: "http://43.205.254.120:9000/",
      options: {
        "sonar.projectDescription": "This is a Node JS application",
        "sonar.projectName": "Nodejs Application",
        "sonar.projectKey": "NodejsSDE",
        "sonar.login": "squ_e1a333bd4500a958faa6ab34127903a45de8d099",
        "sonar.projectVersion": "1.0",
        "sonar.language": "js",
        "sonar.sourceEncoding": "UTF-8",
        "sonar.sources": ".",
        "sonar.exclusions": "**/node_modules/**,**/public/**,**/*.spec.js",
        "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      },
    },
    () => {
      console.log("SonarQube scan completed");
    }
  );
} catch (error) {
  console.error("Error during SonarQube scan:", error);
}
