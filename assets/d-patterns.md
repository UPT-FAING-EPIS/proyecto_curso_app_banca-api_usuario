# Patrones de diseño implementados

## Introducción

El presente trabajo tiene como objetivo analizar la implementación de diferentes patrones de diseño en una API de usuarios de una institución bancaria. Los patrones de diseño seleccionados para este proyecto son DTO, CQRS, Repository, Service Layer, Abstract Factory y Strategy. Estos patrones son ampliamente utilizados en el desarrollo de aplicaciones robustas, escalables y mantenibles, y proporcionan una estructura sólida para la organización y gestión de la lógica de negocio.

## Objetivos

* Explorar la importancia de utilizar patrones de diseño en el desarrollo de una API de usuarios en el contexto de una institución bancaria.
* Analizar y comprender cada uno de los patrones de diseño seleccionados y su aplicabilidad en el contexto del proyecto.
* Evaluar los beneficios y desafíos asociados con la implementación de cada patrón de diseño en el proyecto.

## DTO (Data Transfer Object)

El patrón DTO (Data Transfer Object) se utiliza para transferir datos entre diferentes componentes de un sistema, especialmente cuando se necesita pasar datos entre capas o servicios. Los DTOs son objetos simples que contienen campos para almacenar datos y no tienen lógica adicional. Su propósito principal es proporcionar una estructura clara y eficiente para transportar datos sin exponer la implementación interna del sistema.

Los DTOs suelen utilizarse en aplicaciones distribuidas o en arquitecturas de microservicios, donde los datos se transmiten a través de la red. Al utilizar DTOs, se puede reducir el acoplamiento entre los componentes y mejorar la eficiencia al enviar solo los datos necesarios.

![Alt text](diagram-dto.png)

## CQRS (Command Query Responsibility Segregation)

CQRS es un patrón de arquitectura que propone separar las operaciones de escritura (comandos) y las operaciones de lectura (consultas) en sistemas complejos. El objetivo principal del CQRS es optimizar el rendimiento y la escalabilidad, permitiendo diferentes modelos y enfoques para las operaciones de escritura y lectura.

### Command

En el contexto de CQRS, el patrón Command se utiliza para representar las intenciones de realizar una acción o una operación en el sistema. Los comandos encapsulan la información necesaria para llevar a cabo una operación, como la creación, actualización o eliminación de datos.

Los comandos se envían a los correspondientes Command Handlers, que son responsables de ejecutar la lógica de negocio asociada y realizar las operaciones necesarias en el modelo de dominio. Los comandos pueden desencadenar cambios en el estado del sistema o generar eventos para notificar sobre los cambios realizados.

El patrón Command en CQRS ayuda a separar las operaciones de escritura de las operaciones de lectura, lo que permite una mayor flexibilidad y escalabilidad al tratar con diferentes requerimientos y cargas de trabajo en un sistema.

![Alt text](diagram-cqrs-commands.png)

### Queries

En el contexto de CQRS (Command Query Responsibility Segregation), los queries representan las operaciones de lectura o consultas que se realizan en un sistema. Los queries permiten obtener información específica o realizar búsquedas en los datos almacenados. Estas consultas se realizan en un modelo de lectura optimizado para la consulta, separado del modelo de escritura utilizado por los comandos. Al separar las operaciones de lectura de las operaciones de escritura, se puede optimizar el rendimiento y la escalabilidad del sistema, ya que cada modelo se puede diseñar y ajustar de manera independiente para satisfacer las necesidades específicas. Los queries se envían a los Query Handlers, que son responsables de procesar las consultas y devolver los resultados correspondientes. Estos handlers pueden acceder al modelo de lectura, que puede estar construido con proyecciones o vistas materializadas de los datos subyacentes. Esto permite una recuperación eficiente de los datos y la presentación de información actualizada y coherente para satisfacer los requisitos de consulta del sistema. En resumen, los queries en el contexto de CQRS permiten separar y optimizar las operaciones de lectura para mejorar el rendimiento y la eficiencia de un sistema distribuido o de alta carga de trabajo.

![Alt text](diagram-cqrs-queries.png)

## Repository (Patrón Repository)

El patrón Repository se utiliza para abstraer el acceso a los datos y proporcionar una interfaz común para interactuar con ellos. Actúa como una capa de persistencia entre la lógica de negocio y el almacenamiento de datos subyacente (por ejemplo, una base de datos).

El patrón Repository permite separar la lógica de negocio de los detalles de acceso a datos, lo que facilita el mantenimiento y la prueba de la aplicación. Además, facilita la adopción de cambios en la fuente de datos subyacente, ya que los clientes solo interactúan con la interfaz del Repositorio en lugar de depender directamente de la implementación específica del almacenamiento de datos.

![Alt text](diagram-repository.png)

## Service Layer

El patrón Service Layer, también conocido como Capa de Servicios, es un patrón de diseño que se utiliza para encapsular la lógica de negocio de una aplicación y separarla de los detalles de implementación y acceso a datos. En este enfoque, los servicios se encargan de realizar operaciones específicas y actúan como intermediarios entre los componentes de la aplicación, promoviendo una arquitectura modular, reutilizable y de fácil mantenimiento. Los servicios se centran en la ejecución de tareas relacionadas con la lógica de negocio, interactúan con otros componentes según sea necesario y permiten una clara separación de responsabilidades, lo que facilita la prueba, la escalabilidad y la evolución de la aplicación.

![Alt text](diagram-service-layer.png)

## Abstract Factory

El patrón Abstract Factory proporciona una interfaz para crear familias de objetos relacionados sin especificar sus clases concretas. Permite encapsular la creación de objetos y garantizar que los objetos creados sean compatibles y coherentes entre sí. Esto promueve la flexibilidad y la extensibilidad al permitir la fácil incorporación de nuevas variantes de objetos sin modificar el código existente. El patrón Abstract Factory es especialmente útil cuando se necesita crear conjuntos de objetos relacionados que siguen un tema o variante común.

![Alt text](diagram-factory.png)

## Strategy

El patrón Strategy define una familia de algoritmos intercambiables y los encapsula en clases separadas, lo que permite que los algoritmos varíen independientemente de los clientes que los utilizan. Proporciona una forma de cambiar dinámicamente el comportamiento de un objeto en tiempo de ejecución, seleccionando una estrategia adecuada en función de las necesidades o condiciones específicas. El patrón Strategy ayuda a reducir la duplicación de código y mejora la mantenibilidad al separar las responsabilidades de los algoritmos y permitir su reutilización en diferentes contextos.

![Alt text](diagram-strategy.png)

## Conclusiones

La implementación de patrones de diseño en una API de usuarios de una banca ofrece numerosos beneficios. El uso de DTOs permite una representación estructurada y segura de los datos que se intercambian entre los diferentes componentes del sistema. La adopción del patrón CQRS proporciona una separación clara entre las operaciones de lectura y escritura, lo que facilita la escalabilidad y mejora el rendimiento. El patrón Repository abstrae la persistencia de datos y facilita la gestión de las operaciones de acceso a la base de datos. La aplicación del patrón Service Layer promueve la cohesión y reutilización del código de negocio. La utilización de Abstract Factory permite la creación de familias de objetos relacionados de forma coherente y extensible. Por último, el patrón Strategy brinda flexibilidad al permitir la selección dinámica de algoritmos en tiempo de ejecución.

En resumen, la implementación de estos patrones de diseño en la API de usuarios de una banca mejora la modularidad, la flexibilidad y la mantenibilidad del sistema, permitiendo un desarrollo más eficiente y una adaptación más fácil a los cambios futuros.