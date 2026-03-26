# Réglement qualité

## Tests Unitaires

### A quoi servent les tests unitaires :

Les tests unitaires ont pour objectif de vérifier le bon fonctionnement des plus petites unités de code de notre application, généralement des fonctions ou des méthodes individuelles. Chaque test unitaire est conçu pour tester un cas particulier, isolé des autres composants, en se concentrant uniquement sur une fonction ou un module précis.

### Pourquoi il ne faut pas les désactiver :

**Détection précoce des bugs** : Les tests unitaires permettent d'identifier rapidement les erreurs introduites lors des modifications du code, souvent avant même que le code n'atteigne un stade plus avancé de développement.

**Maintenabilité du code** : Lorsque les tests unitaires sont en place, les développeurs peuvent refactorer le code avec plus de confiance, sachant que les tests vérifieront que les modifications n'ont pas cassé le comportement existant.

**Documentation vivante** : Les tests unitaires servent également de documentation. Ils montrent comment chaque unité de code est censée fonctionner et quelles sont les attentes en termes de résultats.

## Intégration Continue (CI) avec GitHub Actions

### A quoi sert la CI avec GitHub Actions :

L'intégration continue (CI) est un processus qui automatise la construction et le test de votre code chaque fois que des modifications sont apportées à votre projet. GitHub Actions est une plateforme qui vous permet de définir des workflows CI pour exécuter des tests, des builds, et d'autres tâches sur chaque pull request.

### Pourquoi il ne faut pas la désactiver :

**Automatisation des tests** : La CI exécute automatiquement les tests unitaires et E2E à chaque changement de code, assurant que le code qui est fusionné dans la branche principale est toujours de haute qualité.

**Détection rapide des problèmes** : En exécutant les tests sur chaque pull request, les problèmes peuvent être détectés et résolus rapidement, avant qu'ils ne s'aggravent ou ne soient déployés en production.

**Enforcement de la qualité du code** : La CI empêche l'intégration de code qui ne passe pas les tests, garantissant ainsi que les bugs sont détectés tôt et que seul du code fonctionnel est déployé.

**Standardisation du processus de développement** : La CI garantit que tous les développeurs suivent le même processus de test, ce qui standardise et améliore la qualité du code dans toute l'équipe.
