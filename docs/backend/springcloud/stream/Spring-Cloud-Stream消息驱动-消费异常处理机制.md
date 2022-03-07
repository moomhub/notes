# Spring Cloud Stream 消息驱动-消费异常处理机制


在 Spring Cloud Stream 中，提供了通用的消费异常处理机制，可以拦截到消费者消费消息时发生的异常，进行自定义的处理逻辑。

```java
  /*针对于单个通道和分组的监听*/
    @ServiceActivator(inputChannel = "<destination>.<group>.errors")
    public void handleError(ErrorMessage errorMessage) {
        logger.error("[handleError][payload：{}]", ExceptionUtils.getRootCauseMessage(errorMessage.getPayload()));
        logger.error("[handleError][originalMessage：{}]", errorMessage.getOriginalMessage());
        logger.error("[handleError][headers：{}]", errorMessage.getHeaders());
    }
  /*全局的错误监听*/
    @StreamListener(IntegrationContextUtils.ERROR_CHANNEL_BEAN_NAME) // errorChannel
    public void globalHandleError(ErrorMessage errorMessage) {
        logger.error("[globalHandleError][payload：{}]", ExceptionUtils.getRootCauseMessage(errorMessage.getPayload()));
        logger.error("[globalHandleError][originalMessage：{}]", errorMessage.getOriginalMessage());
        logger.error("[globalHandleError][headers：{}]", errorMessage.getHeaders());
    }
```

