# ChessGame

Jeu d'échec avec un mode multijoueur et une IA(WIP), possibilité de jouer à deux sur un même PC

## Procédure Versioning
Git est un outil qui va vous permettre de gérer les différentes versions du code de la plateforme. Pour cela, nous vous proposons une procédure stricte à respecter afin que chacun puisse s'y retrouver facilement.

### Les différentes Commandes

`git fetch origin` : permet de mettre à jour le repos local par rapport au repos distant

`git checkout -b <nom_de_branche> `: permet de créer une nouvelle branche à partir de la branche actuelle et de se positionner sur celle-ci.

`git rebase`: permet de récupérer les mises à jour distantes et d'y appliquer les modifications locales

`git push`: permet d'envoyer les commits locaux sur le repos distant

`git commit -m <info_du_commit>`: permet de créer un commit avec les changement précédemment ajouté

`git add -i` : propose un menu pour gérer les différentes modifications apportées au repos local.
### Branches
On aura deux types de développements : soit feature, soit fix. On travaille sur une branche spécifique à chaque développement.
A chaque fois que vous vous apprétez à réaliser une action, vous devez mettre à jour votre repos local grâce à la commande `git fetch origin`
Il est important de créer une nouvelle branche pour chaque développement de fonctionnalité afin de faciliter la gestion des versions, la modification ou la correction de bug.
### Exemples
S'il s'agit d'une feature : `git checkout -b features/my_feature_branch_name origin/dev`
S'il s'agit d'une correction de bug : `git checkout -b fixes/my_fix_branch_name origin/dev`
## Nomenclature des commits
Un commit permet de regrouper un ensemble de modifications, d'ajouter une fonctionnalité ou de corriger un bug. Les commits doivent être concis et les plus petits possibles : une fonctionnalité représente un commit.
Le message d'un commit doit être construit suivant le modèle suivant :
`<type>(périmètre): sujet`
Chaque message de commit doit faire obligatoirement moins de 100 caractères et doit idéalement faire part de la correction unique du commit.
#### Les types de commit
Le type d'un commit peut être :

`feat` : Nouvelle fonctionnalité

`fix` : Correction d’un bug

`refactor` : Modification du code qui ne corrige rien ou n’ajoute rien mais rend l’ensemble plus cool ou prépare le terrain pour une nouvelle fonctionnalité.

`style` : Modification du style.

`perf` : Modification du code qui améliore les performances.

`test` : Ajout ou modification de tests.

`build` : Modification sur le système de build (gradle, gulp, ionic, angular, ...).

`docs` : Modification sur la doc uniquement.

`misc` : Tout ce qui ne va pas dans un autre type.

#### Les périmètres possibles

`fo` : pour des modifications effectuées sur le front-office de la plateforme.

`bo` : pour des modifications effectuées sur le back-office de la plateforme.

`be` : pour des modifications effectuées sur le back-end de la plateforme.

`api` : pour des modifications effectuées sur l'api de la plateforme.

`server` : pour des modifications effectuées sur le serveur de la plateforme.

`all` : pour des modifications génériques à l'ensemble de la plateforme.

#### Les descriptions

Essayez de faire des descriptions assez courtes et en anglais le plus possible.

#### Validation
Pour envoyer un développement sur le repos distant, vous devez effectuer, dans l'ordre, les commandes suivantes :
`git fetch`
`git rebase`
`git push`