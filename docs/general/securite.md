# Sécurité du serveur de production

## Ports ouverts

Le serveur est configuré de sorte que seulement les ports utiles soit ouverts à l'exterieur, les ports utiles etant : 
- le port 80 (protocol HTTP)📡
- le port 443 (protocol HTTPS)🔐 
- le port 22 (protocol SSH )🔧
Cette ouverture de port est faite avec un firewall plus particulierement ufw qui est une smplification des iptables. 
Tous les autres ports refuse l'accès depuis l'exterieur.

## Fail2ban
Le serveur sur le port 22 est prtotégé par un fail2ban permettant de bannir une ip qui tente de se connecter au serveur via le port ssh.

Fail2ban a une configuration simple : 
- 5 essais sur une période de 10 minutes
- Bannissement d'une durée d'une heure
Pour voir les statistique sur le port ssh : 
```bash
    fail2ban-client status sshd
```
Pour voir la configuration faite : 
```bash
    cat /etc/fail2ban/jail.local
```
## Connexion par clé SSH

