
## SSH Tunneling In Metabase
---
Metabase has the ability to connect to some databases by first establishing a connection to a server in between Metabase and a datawarehouse, then connect to the datawarehouse using that connection as a bridge. This makes connecting to some datawarehouses possible in situations that would otherwise prevent the use of Metabase.


### When To Use This Feature
There are two basic cases for using an SSH tunnel rather than connecting directly:

* A direct connection is impossible
* A direct connection is forbidden due to a security policy

Sometimes when a datawarehouse is inside an enterprise environment, direct connections are blocked by security devices such as firewalls and intrusion prevention systems. To work around this many enterprises offer a VPN, a bastion host, or both. VPNs are the more convenient and reliable option though bastion hosts are used frequently, especially with cloud providers such as Amazon Web Services where VPC (Virtual Private Clouds) don't allow direct connections. Bastion hosts offer the option to first connect to a computer on the edge of the protected network, then from that computer establish a second connection to the datawarehouse on the internal network and essentially patch these two connestions together. Using the SSH tunneling feature, Metabase is able to automate this process in many cases. If a VPN is available that should be used in preference to SSH tunneling.

### How To Use This Feature

When connecting though a bastion host:

* Answer yes to the "Use an SSH-tunnel for database connections" parameter
* Enter the hostname for the datawarehouse as it is seen from inside the network in the `Host` parameter.
* Enter the datawarehouse port as seen from inside the network into the `Port` parameter.
* Enter the extenal name of the bastion host as seen from the outside of the network (or wherever you are) into the `SSH tunnel host` parameter.
* Enter the ssh port as seen from outside the network into the `SSH tunnel port` parameter. This is usually 22, regardless of which datawarehouse you are connecting to.
* Enter the username and password you use to login to the bastion host into the `SSH tunnel username` and `SSH tunnel password` parameters.

If you are unable to connect test your ssh credentials by connecting to the SSH server/Bastion Host using ssh directly:

    ssh <SSH tunnel username>@<SSH tunnel host> -p <SSH tunnel port>


Another common case where direct connections are not possible is when connecting to a datawarehouse that is only accessible locally and does not allow remote connections. In this case you will be opening an SSH connection to the datawarehouse, then from there connecting back to the same computer.

* Answer yes to the "Use an SSH-tunnel for database connections" parameter
* Enter `localhost` in the `Host` parameter. This is the name the server
* Enter the same value in the `Port` parameter that you would use if you where sitting directly at the datawarehouse host system.
* Enter the extenal name of the datawarehouse, as seen from the outside of the network (or wherever you are) into the `SSH tunnel host` parameter.
* Enter the ssh port as seen from outside the network into the `SSH tunnel port` parameter. This is usually 22, regardless of which datawarehouse you are connecting to.
* Enter the username and password you use to login to the bastion host into the `SSH tunnel username` and `SSH tunnel password` parameters.

If you have problems connecting verify the ssh host port and password by connecing manually using ssh or PuTTY on older windows systems.

### Disadvantages to Indirect Connections

While using an ssh tunnel makes it possible to use a datawarehouse that is otherwise not accessible it is almost always preferable to use a direct connection when possible:

There are several inherent limitations to connecting through a tunnel:

* If the enclosing SSH connection is closed because you put your computer to sleep or change networks, all established connections will be closed as well. This can cause delays resuming connections after suspending your laptop
* It's almost always slower. The connection has to go through an additional computer.
* Opening new connections takes longer. SSH connections are slower to establish then direct connections.
* Multiple operations over the same SSH tunnel can block each other. This can increase latency in some cases.
* The number of connections through a bastion host is often limited by organizational policy.
* Some organizations have IT security policies forbidding using SSH tunnels to bypass security perimeters.

### What if The Built in SSH Tunnels Don't Fit My Needs?

This feature exists as a convenient wrapper around SSH and automates the common cases of connecting through a tunnel. It also makes connecting possible from systems that don't have or allow shell access. Metabase uses a built in SSH client that does not depend on the installed system's ssh client. This allows connecting from systems where it's not possible to run SSH manually, it also means that Metabase cannot take advantage of authentication services provided by the system such as Windows Domain Authentication or Kerberos Authentication.

If you need to connect in method not enabled by Metabase, you can often accomplish this by running ssh directly:

    ssh -Nf -L input-port:internal-server-name:port-on-server username@bastion-host.domain.com

This allows you to use the full array of featured included in ssh. If you find yourself doing this often, please let us know so we can see about making your process more convenient through Metabase.

## That’s it!
If you still have questions, or want to share Metabase tips and tricks, head over to our [discussion board](http://discourse.metabase.com/). See you there!
